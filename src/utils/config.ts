import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'DATABASE_URL',
  'JWT_SECRET',
  'GOOGLE_MAPS_API_KEY',
  'AFRO_SMS_API_KEY',
  'AFRO_SMS_IDENTIFIER_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
}

// Export environment variables
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  afroSmsApiKey: process.env.AFRO_SMS_API_KEY,
  afroSmsIdentifierId: process.env.AFRO_SMS_IDENTIFIER_ID
} as const; 