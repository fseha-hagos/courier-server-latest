import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DeliveryStatus, PackageStatus } from '@prisma/client';
export declare const initializeWebSocket: (server: HttpServer) => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
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
export declare const emitPackageUpdate: (packageId: string, update: PackageUpdateEvent) => void;
export declare const emitPackageCancelled: (packageId: string, data: {
    reason: string;
    by: {
        id: string;
        type: string;
    };
    refundAmount?: number;
    timestamp: Date;
}) => void;
export declare const emitDisputeCreated: (packageId: string, data: {
    disputeId: string;
    type: string;
    priority: string;
    description: string;
    timestamp: Date;
}) => void;
export declare const emitPackageRequiresAttention: (packageId: string, data: {
    reason: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    details?: any;
}) => void;
export declare const emitDeliveryAssigned: (packageId: string, deliveryPerson: {
    id: string;
    name: string;
    phoneNumber?: string;
    vehicle: {
        type: string;
        plateNumber: string;
    };
}) => void;
export declare const emitLocationUpdate: (packageId: string, location: {
    latitude: number;
    longitude: number;
    address?: string;
    timestamp: Date;
    status?: string;
}) => void;
export declare const STATUS_TRANSITIONS: Record<PackageStatus, PackageStatus[]>;
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
export declare const emitDashboardStatsUpdate: (stats: DashboardStatsUpdate) => void;
export declare const emitDashboardDeliveryUpdate: (delivery: RecentDelivery) => void;
export declare const emitDashboardTopDeliveryPersonsUpdate: (deliveryPersons: TopDeliveryPerson[]) => void;
export interface DeliveryRequestEvent {
    packageId: string;
    timestamp: Date;
    expiresAt: Date;
    pickupLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };
    deliveryLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };
    package: {
        description: string;
        weight: number;
        priority: 'LOW' | 'MEDIUM' | 'HIGH';
    };
}
export interface DeliveryResponseEvent {
    packageId: string;
    timestamp: Date;
    deliveryPersonId: string;
    response: 'ACCEPT' | 'DECLINE';
    reason?: string;
}
export declare const emitDeliveryRequest: (data: DeliveryRequestEvent) => void;
export declare const emitDeliveryResponse: (packageId: string, data: DeliveryResponseEvent) => void;
export {};
//# sourceMappingURL=websocket.d.ts.map