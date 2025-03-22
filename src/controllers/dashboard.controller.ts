import { Request, Response } from 'express';
import { db } from '@utils/db';
import { DeliveryStatus, PackageStatus, UserStatus } from '@prisma/client';
import { emitDashboardStatsUpdate, emitDashboardDeliveryUpdate, emitDashboardTopDeliveryPersonsUpdate } from '@utils/websocket';

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      activeDeliveries,
      todayPackages,
      onlineDeliveryPersons,
      completedDeliveries,
      totalDeliveries,
      recentDeliveries,
      topDeliveryPersons
    ] = await Promise.all([
      // Total active deliveries
      db.delivery.count({
        where: {
          status: {
            in: [DeliveryStatus.ASSIGNED, DeliveryStatus.IN_PROGRESS]
          }
        }
      }),
      // Total packages created today
      db.package.count({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      // Active delivery persons
      db.users.count({
        where: {
          role: 'DELIVERY_PERSON',
          status: UserStatus.ONLINE
        }
      }),
      // Completed deliveries (for success rate)
      db.delivery.count({
        where: {
          status: DeliveryStatus.COMPLETED
        }
      }),
      // Total deliveries (for success rate)
      db.delivery.count({
        where: {
          status: {
            in: [DeliveryStatus.COMPLETED, DeliveryStatus.FAILED]
          }
        }
      }),
      // Recent deliveries
      db.delivery.findMany({
        where: {
          status: {
            in: [DeliveryStatus.ASSIGNED, DeliveryStatus.IN_PROGRESS, DeliveryStatus.COMPLETED, DeliveryStatus.FAILED]
          }
        },
        include: {
          package: {
            include: {
              customer: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }),
      // Top delivery persons
      db.users.findMany({
        where: {
          role: 'DELIVERY_PERSON',
          deliveries: {
            some: {
              status: DeliveryStatus.COMPLETED
            }
          }
        },
        include: {
          vehicles: true,
          deliveries: {
            where: {
              status: DeliveryStatus.COMPLETED
            }
          },
          _count: {
            select: {
              deliveries: {
                where: {
                  status: DeliveryStatus.COMPLETED
                }
              }
            }
          }
        },
        orderBy: {
          averageRating: 'desc'
        },
        take: 5
      })
    ]);

    // Calculate success rate
    const successRate = totalDeliveries > 0 
      ? (completedDeliveries / totalDeliveries) * 100 
      : 0;

    // Format recent deliveries
    const formattedRecentDeliveries = recentDeliveries.map(delivery => ({
      id: delivery.id,
      customerName: delivery.package.customer.name,
      customerPhone: delivery.package.customer.phoneNumber || '',
      deliveryStatus: delivery.status,
      updatedAt: delivery.createdAt
    }));

    // Format top delivery persons
    const formattedTopDeliveryPersons = topDeliveryPersons.map(dp => ({
      id: dp.id,
      name: dp.name,
      phoneNumber: dp.phoneNumber || '',
      status: dp.status,
      rating: dp.averageRating || 0,
      completedDeliveries: dp._count.deliveries,
      currentLocation: dp.vehicles[0] ? {
        latitude: dp.vehicles[0].currentLatitude || 0,
        longitude: dp.vehicles[0].currentLongitude || 0
      } : null,
      vehicle: dp.vehicles[0] ? {
        id: dp.vehicles[0].id,
        type: dp.vehicles[0].type,
        plateNumber: dp.vehicles[0].licensePlate,
        maxWeight: dp.vehicles[0].maxWeight
      } : null
    }));

    // Emit real-time updates
    emitDashboardStatsUpdate({
      totalActiveDeliveries: activeDeliveries,
      totalPackagesToday: todayPackages,
      activeDeliveryPersons: onlineDeliveryPersons,
      successRate
    });

    // Emit recent deliveries update if there are any
    if (formattedRecentDeliveries.length > 0) {
      formattedRecentDeliveries.forEach(delivery => {
        emitDashboardDeliveryUpdate(delivery);
      });
    }

    // Emit top delivery persons update
    emitDashboardTopDeliveryPersonsUpdate(formattedTopDeliveryPersons);

    res.status(200).json({
      success: true,
      stats: {
        totalActiveDeliveries: activeDeliveries,
        totalPackagesToday: todayPackages,
        activeDeliveryPersons: onlineDeliveryPersons,
        successRate,
        recentDeliveries: formattedRecentDeliveries,
        topDeliveryPersons: formattedTopDeliveryPersons
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard statistics' });
  }
};

// Get delivery status breakdown
export const getDeliveryStatusBreakdown = async (req: Request, res: Response): Promise<void> => {
  try {
    const { timeRange = 'today' } = req.query;
    
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    // Adjust start date based on time range
    switch (timeRange) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      // 'today' is default, no need to adjust
    }

    // Get all possible delivery statuses
    const statuses = Object.values(DeliveryStatus);

    // Count deliveries for each status in the time range
    const statusCounts = await Promise.all(
      statuses.map(status =>
        db.delivery.count({
          where: {
            status,
            createdAt: {
              gte: startDate
            }
          }
        })
      )
    );

    // Format response
    const breakdown = statuses.map((status, index) => ({
      status,
      count: statusCounts[index]
    }));

    res.status(200).json({
      success: true,
      breakdown
    });
  } catch (error) {
    console.error('Error fetching delivery status breakdown:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch delivery status breakdown' });
  }
}; 