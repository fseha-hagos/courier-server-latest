import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "src/utils/db";
import { sendVerificationSms } from "src/utils/sms";
import { phoneNumber, bearer } from "better-auth/plugins"
import { fromNodeHeaders } from "better-auth/node";
import { admin } from "better-auth/plugins"


export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    trustedOrigins: ["http://localhost:5173"], // Frontend URL
    user: {
        modelName: "users",
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
                input: false // don't allow user to set role
            },
        }
    },
    plugins: [
        phoneNumber({
            expiresIn: 500000, // 5 minutes 
            sendOTP: ({ phoneNumber, code }, request) => {
                // Implement sending OTP code via SMS
                sendVerificationSms(phoneNumber, code)
            },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@my-site.com`
                },
                //optionally you can alos pass `getTempName` function to generate a temporary name for the user
                getTempName: (phoneNumber) => {
                    return phoneNumber //by default it will use the phone number as the name
                }
            },
            // async callbackOnVerification(data, request) {
            //     try {
            //         const newPassword = "hello";
            //         await auth.api.setPassword({ body: { newPassword } });
            //         console.log("Password successfully set");
            //     } catch (error) {
            //         console.error("Error verifying phone number:", error)
            //     }
            //     // console.log("Phone number verified", data)
            //     if(request){
            //         const headers = fromNodeHeaders(Object.fromEntries(request.headers.entries()))
            //         console.log("Phone number verified: Request.headers", headers)

            //     }
            // },
        }),
        admin({
            defaultRole: "customer",
            adminRole: ["admin", "superAdmin"]
        })

    ]
})