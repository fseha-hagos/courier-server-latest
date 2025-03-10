import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { PackageStatus } from '@prisma/client';
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
export {};
//# sourceMappingURL=websocket.d.ts.map