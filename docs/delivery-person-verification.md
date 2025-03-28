# Delivery Person Phone Verification Integration Guide

## Overview
This guide explains how to integrate with the delivery person phone verification and password setting flow. The process involves three main steps:
1. Initiate phone verification
2. Verify OTP
3. Set password

## Endpoints

### 1. Initiate Phone Verification
```typescript
POST /api/delivery-persons/verify-phone

Request Body:
{
  "phoneNumber": string // e.g., "+251994697123"
}

Response (200):
{
  "success": true,
  "message": "Verification code sent successfully"
}

Error Responses:
- 400: Invalid phone number format or user not found
- 403: Account is banned
- 500: Server error
```

### 2. Verify OTP
```typescript
POST /api/delivery-persons/verify-otp

Request Body:
{
  "phoneNumber": string, // Same phone number used in step 1
  "code": string        // OTP received via SMS
}

Response (200):
{
  "success": true,
  "message": "Phone number verified successfully"
}

Error Responses:
- 400: Invalid phone number format, code, or user not found
- 403: Account is banned
- 500: Server error
```

### 3. Set Password
```typescript
POST /api/delivery-persons/set-password

Request Body:
{
  "newPassword": string // New password to set
}

Headers Required:
- Authorization: Bearer token (received from verify-otp response)

Response (200):
{
  "success": true,
  "message": "Password set successfully"
}

Error Responses:
- 400: New password is required
- 401: No valid session found
- 403: User is not a delivery person
- 500: Server error
```

## Integration Flow

1. **Start Phone Verification**
   ```typescript
   const initiateVerification = async (phoneNumber: string) => {
     try {
       const response = await fetch('/api/delivery-persons/verify-phone', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ phoneNumber })
       });
       
       const data = await response.json();
       if (!data.success) {
         throw new Error(data.error);
       }
       
       // Show success message to user
       // Display OTP input field
     } catch (error) {
       // Handle error (show error message to user)
     }
   };
   ```

2. **Verify OTP**
   ```typescript
   const verifyOTP = async (phoneNumber: string, code: string) => {
     try {
       const response = await fetch('/api/delivery-persons/verify-otp', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ phoneNumber, code })
       });
       
       const data = await response.json();
       if (!data.success) {
         throw new Error(data.error);
       }
       
       // Store the token from response
       // Show success message
       // Display password setting form
     } catch (error) {
       // Handle error
     }
   };
   ```

3. **Set Password**
   ```typescript
   const setPassword = async (newPassword: string) => {
     try {
       const response = await fetch('/api/delivery-persons/set-password', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}` // Token from verify-otp response
         },
         body: JSON.stringify({ newPassword })
       });
       
       const data = await response.json();
       if (!data.success) {
         throw new Error(data.error);
       }
       
       // Show success message
       // Redirect to login or dashboard
     } catch (error) {
       // Handle error
     }
   };
   ```

## Complete Flow Example
```typescript
const handlePhoneVerification = async () => {
  try {
    // Step 1: Initiate verification
    await initiateVerification(phoneNumber);
    
    // Step 2: Verify OTP (after user enters code)
    const { token } = await verifyOTP(phoneNumber, otpCode);
    
    // Step 3: Set password (after user enters new password)
    await setPassword(newPassword);
    
    // Handle successful completion
  } catch (error) {
    // Handle errors
  }
};
```

## Important Notes
1. Phone numbers should be in E.164 format (e.g., "+251994697123")
2. OTP codes expire after 5 minutes
3. The password setting endpoint requires a valid session token
4. All endpoints return consistent response formats with `success` and optional `error` fields
5. Handle all error cases appropriately in the UI
6. Store sensitive data (tokens, passwords) securely
7. Use HTTPS for all API calls
8. Implement proper loading states and error handling in the UI

## Error Handling
- Display user-friendly error messages
- Implement retry mechanisms for failed requests
- Handle network errors gracefully
- Show appropriate loading states during API calls
- Validate input before sending to server
- Implement proper session management

