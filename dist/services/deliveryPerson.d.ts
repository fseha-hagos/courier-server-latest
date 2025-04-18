import { UserStatus } from '@prisma/client';
export declare const updateDeliveryPersonStatus: (userId: string, status: UserStatus) => Promise<{
    name: string;
    id: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    role: string | null;
    banExpires: string | null;
    banReason: string | null;
    banned: boolean | null;
    status: import(".prisma/client").$Enums.UserStatus;
    averageRating: number | null;
    completedDeliveries: number;
    failedDeliveries: number;
}>;
export declare const getDeliveryPersons: () => Promise<{
    name: string;
    id: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    role: string | null;
    banExpires: string | null;
    banReason: string | null;
    banned: boolean | null;
    status: import(".prisma/client").$Enums.UserStatus;
    averageRating: number | null;
    completedDeliveries: number;
    failedDeliveries: number;
}[]>;
//# sourceMappingURL=deliveryPerson.d.ts.map