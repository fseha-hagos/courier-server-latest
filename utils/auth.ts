import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@utils/db";
import { phoneNumber } from "better-auth/plugins"


export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
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
            sendOTP: ({ phoneNumber, code }, request) => { 
                // Implement sending OTP code via SMS
            },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@my-site.com`
                },
                //optionally you can alos pass `getTempName` function to generate a temporary name for the user
                getTempName: (phoneNumber) => {
                    return phoneNumber //by default it will use the phone number as the name
                }
            }
        }) 
    ] 
})