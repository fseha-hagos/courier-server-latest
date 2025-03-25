import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "src/utils/db";
import { sendVerificationSms } from "src/utils/sms";
import { phoneNumber, bearer } from "better-auth/plugins"
import { fromNodeHeaders } from "better-auth/node";
import { admin } from "better-auth/plugins"
import { expo } from "@better-auth/expo";
import { formatPhoneNumberForStorage, isValidPhoneNumber } from "./phone";

// Function to ensure phone number is in consistent format
const ensurePhoneNumberFormat = async (phoneNumber: string): Promise<void> => {
    try {
        const formattedNumber = formatPhoneNumberForStorage(phoneNumber);
        
        // Try to find and update any existing user with this phone number
        const user = await db.users.findFirst({
            where: {
                OR: [
                    { phoneNumber },
                    { phoneNumber: formattedNumber },
                    { phoneNumber: phoneNumber.replace(/\s+/g, '') }
                ]
            }
        });

        if (user) {
            // Update to consistent format if found
            await db.users.update({
                where: { id: user.id },
                data: { phoneNumber: formattedNumber }
            });
        }
    } catch (error) {
        console.error('Error updating phone number format:', error);
    }
};

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    trustedOrigins: ["http://localhost:5173"], // Frontend URL
    user: {
        modelName: "users",
        additionalFields: {
            vehicles: {
                type: "string[]",
                required: false,
            },
            deliveries: {
                type: "string[]",
                required: false,
            },
        }
    },
    plugins: [
        phoneNumber({
            expiresIn: 500000, // 5 minutes 
            sendOTP: async ({ phoneNumber, code }, request) => {
                const formattedNumber = formatPhoneNumberForStorage(phoneNumber);
                await ensurePhoneNumberFormat(phoneNumber);
                sendVerificationSms(formattedNumber, code);
            },
            signUpOnVerification: {
                getTempEmail: (phoneNumber: string) => {
                    const formattedNumber = formatPhoneNumberForStorage(phoneNumber);
                    return `${formattedNumber}@my-site.com`
                },
                getTempName: (phoneNumber: string) => {
                    return formatPhoneNumberForStorage(phoneNumber);
                }
            }
        }),
        admin({
            defaultRole: "customer",
            adminRole: ["admin", "superAdmin"]
        }),
        expo()
    ]
})