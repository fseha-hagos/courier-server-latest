import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DeliveryStatus, PackageStatus } from '@prisma/client';

let io: Server;

export const initializeWebSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
        },
        transports: ['websocket', 'polling'],
        allowEIO3: true,
        pingTimeout: 60000,
        pingInterval: 25000
    });

    io.on('connection', (socket: Socket) => {
        console.log('Client connected:', socket.id);

        // Join package room for updates
        socket.on('subscribe:package', (packageId: string) => {
            socket.join(`package:${packageId}`);
            console.log(`Client ${socket.id} subscribed to package ${packageId}`);
        });

        // Leave package room
        socket.on('unsubscribe:package', (packageId: string) => {
            socket.leave(`package:${packageId}`);
            console.log(`Client ${socket.id} unsubscribed from package ${packageId}`);
        });

        // Subscribe to dashboard updates
        socket.on('subscribe:dashboard', () => {
            socket.join('dashboard');
            console.log(`Client ${socket.id} subscribed to dashboard updates`);
        });

        // Unsubscribe from dashboard updates
        socket.on('unsubscribe:dashboard', () => {
            socket.leave('dashboard');
            console.log(`Client ${socket.id} unsubscribed from dashboard updates`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

interface PackageUpdateEvent {
    status?: PackageStatus;
    location?: {
        latitude: number;
        longitude: number;
        address?: string;
    };
    note?: {
        id: string;
        message: string;
        timestamp: Date;
        actor: {
            id: string;
            name: string;
            role: string;
        };
    };
    timestamp?: Date;
}

export const emitPackageUpdate = (packageId: string, update: PackageUpdateEvent): void => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:update', {
        packageId,
        timestamp: new Date(),
        ...update
    });

    console.log(`Emitting package update for ${packageId}:`, update);
};

export const emitPackageCancelled = (packageId: string, data: {
    reason: string;
    by: {
        id: string;
        type: string;
    };
    refundAmount?: number;
    timestamp: Date;
}) => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:cancelled', {
        packageId,
        ...data
    });
};

export const emitDisputeCreated = (packageId: string, data: {
    disputeId: string;
    type: string;
    priority: string;
    description: string;
    timestamp: Date;
}) => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:dispute_created', {
        packageId,
        ...data
    });
};

export const emitPackageRequiresAttention = (packageId: string, data: {
    reason: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    details?: any;
}) => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:requires_attention', {
        packageId,
        timestamp: new Date(),
        ...data
    });
};

export const emitDeliveryAssigned = (packageId: string, deliveryPerson: {
    id: string;
    name: string;
    phoneNumber?: string;
    vehicle: {
        type: string;
        plateNumber: string;
    };
}) => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:assigned', {
        packageId,
        timestamp: new Date(),
        deliveryPerson
    });
};

export const emitLocationUpdate = (packageId: string, location: {
    latitude: number;
    longitude: number;
    address?: string;
    timestamp: Date;
    status?: string;
}) => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to(`package:${packageId}`).emit('package:location', {
        packageId,
        location,
        timestamp: new Date()
    });
};

// Status transition rules
export const STATUS_TRANSITIONS: Record<PackageStatus, PackageStatus[]> = {
    PENDING: [PackageStatus.ASSIGNED, PackageStatus.CANCELLED],
    ASSIGNED: [PackageStatus.IN_PROGRESS, PackageStatus.CANCELLED],
    IN_PROGRESS: [PackageStatus.COMPLETED, PackageStatus.FAILED, PackageStatus.CANCELLED],
    COMPLETED: [],
    FAILED: [PackageStatus.PENDING],
    CANCELLED: [PackageStatus.PENDING]
};

interface DashboardStatsUpdate {
    totalActiveDeliveries: number;
    totalPackagesToday: number;
    activeDeliveryPersons: number;
    successRate: number;
}

interface RecentDelivery {
    id: string;
    customerName: string;
    customerPhone: string;
    deliveryStatus: DeliveryStatus;
    updatedAt: Date;
}

interface TopDeliveryPerson {
    id: string;
    name: string;
    phoneNumber: string;
    status: string;
    rating: number;
    completedDeliveries: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    } | null;
    vehicle: {
        id: string;
        type: string;
        plateNumber: string;
        maxWeight: number;
    } | null;
}

// Emit dashboard stats update
export const emitDashboardStatsUpdate = (stats: DashboardStatsUpdate): void => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to('dashboard').emit('dashboard:stats_update', {
        timestamp: new Date(),
        ...stats
    });
};

// Emit new delivery update for dashboard
export const emitDashboardDeliveryUpdate = (delivery: RecentDelivery): void => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to('dashboard').emit('dashboard:delivery_update', {
        timestamp: new Date(),
        delivery
    });
};

// Emit top delivery persons update
export const emitDashboardTopDeliveryPersonsUpdate = (deliveryPersons: TopDeliveryPerson[]): void => {
    if (!io) {
        console.error('WebSocket not initialized');
        return;
    }

    io.to('dashboard').emit('dashboard:top_delivery_persons_update', {
        timestamp: new Date(),
        deliveryPersons
    });
}; 