# Delivery Request Flow Specification

## Overview
This document outlines the changes needed to implement a delivery request flow where packages are not directly assigned to delivery persons but instead go through a request-acceptance flow.

## Database Changes

### Delivery Model
```prisma
model Delivery {
  // Existing fields
  id              String         @id @default(cuid())
  packageId       String         @unique
  package         Package        @relation(fields: [packageId], references: [id])
  deliveryPersonId String?      // Now optional since it's not assigned immediately
  deliveryPerson   DeliveryPerson? @relation(fields: [deliveryPersonId], references: [id])
  status          DeliveryStatus
  
  // New fields
  requestedAt     DateTime?     // When the delivery was requested
  requestExpiresAt DateTime?    // When the request expires
  declinedBy      DeclinedDeliveryPerson[] // Track who declined
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

// New model to track declined delivery requests
model DeclinedDeliveryPerson {
  id              String    @id @default(cuid())
  deliveryId      String
  delivery        Delivery  @relation(fields: [deliveryId], references: [id])
  deliveryPersonId String
  deliveryPerson   DeliveryPerson @relation(fields: [deliveryPersonId], references: [id])
  reason          String?   // Optional reason for declining
  declinedAt      DateTime @default(now())

  @@unique([deliveryId, deliveryPersonId])
}
```

### Updated Enums
```prisma
enum DeliveryStatus {
  PENDING_ACCEPTANCE // New status
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  FAILED
  DECLINED
}
```

## WebSocket Events

### New Events
```typescript
export type WebSocketEvent = 
  | 'package:delivery_request'        // Broadcast to available couriers
  | 'package:delivery_response'       // Courier response (accept/decline)
  | 'package:delivery_request_timeout' // Notify admin of timeout
  // ... existing events ...

// Event payload types
export interface DeliveryRequest {
  packageId: string
  timestamp: Date
  expiresAt: Date
  pickupLocation: {
    address: string
    latitude: number
    longitude: number
  }
  deliveryLocation: {
    address: string
    latitude: number
    longitude: number
  }
  package: {
    description: string
    weight: number
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
  }
}

export interface DeliveryResponse {
  packageId: string
  timestamp: Date
  deliveryPersonId: string
  response: 'ACCEPT' | 'DECLINE'
  reason?: string
}

export interface DeliveryRequestTimeout {
  packageId: string
  timestamp: Date
  requestedAt: Date
  declinedBy: Array<{
    id: string
    name: string
    reason?: string
  }>
}
```

## API Endpoints

### 1. Create Delivery Request
\`\`\`
POST /api/packages/{packageId}/request-delivery
Authorization: Bearer {token}

Request body:
{
  "expiresIn": number (minutes, optional, default: 5),
  "priority": "LOW" | "MEDIUM" | "HIGH"
}

Response:
{
  "success": boolean,
  "delivery": {
    "id": string,
    "status": "PENDING_ACCEPTANCE",
    "requestedAt": Date,
    "requestExpiresAt": Date,
    // ... other delivery fields
  }
}
\`\`\`

### 2. Handle Delivery Response
\`\`\`
POST /api/packages/{packageId}/delivery-response
Authorization: Bearer {token}

Request body:
{
  "response": "ACCEPT" | "DECLINE",
  "reason": string (optional)
}

Response:
{
  "success": boolean,
  "delivery": {
    "id": string,
    "status": "ASSIGNED" | "DECLINED",
    "deliveryPersonId": string (if accepted),
    // ... other delivery fields
  }
}
\`\`\`

### 3. Get Available Delivery Persons
\`\`\`
GET /api/delivery-persons/available
Authorization: Bearer {token}

Query parameters:
- latitude: number
- longitude: number
- radius: number (km)
- minRating: number (optional)

Response:
{
  "success": boolean,
  "deliveryPersons": [
    {
      "id": string,
      "name": string,
      "status": "ONLINE",
      "currentLocation": {
        "latitude": number,
        "longitude": number
      },
      "rating": number,
      // ... other fields
    }
  ]
}
\`\`\`

## Business Rules

### Delivery Request Flow
1. Admin creates a delivery request for a package
2. System broadcasts request to all available delivery persons within radius
3. Delivery persons can:
   - Accept the request (first to accept gets it)
   - Decline the request (with optional reason)
   - Ignore the request (counts as decline after timeout)
4. Request expires after specified time (default 5 minutes)
5. If request expires or all decline:
   - Package status returns to previous state
   - Admin is notified via WebSocket
   - Admin can create new request

### Availability Rules
1. Delivery person is considered available if:
   - Status is ONLINE
   - Not currently assigned to max deliveries
   - Within specified radius of pickup location
   - Meets minimum rating requirement (if specified)
   - Has not declined this request before

### Request Timeout Handling
1. Server maintains timeout for each request
2. When timeout occurs:
   - Update delivery status
   - Notify admin via WebSocket
   - Stop broadcasting request to couriers
   - Record statistics for analysis

### Security Considerations
1. Only authenticated delivery persons can respond to requests
2. Delivery person cannot accept if:
   - Request has expired
   - Package already assigned
   - They previously declined
3. Admin needs specific permissions to:
   - Create delivery requests
   - View delivery person details
   - Access request history

## Implementation Phases

### Phase 1: Core Infrastructure
1. Database schema updates
2. New API endpoints
3. WebSocket event handlers
4. Basic request/response flow

### Phase 2: Business Logic
1. Timeout handling
2. Availability checking
3. Response validation
4. Status management

### Phase 3: Admin Features
1. Request creation UI
2. Status monitoring
3. Timeout notifications
4. Request history

### Phase 4: Testing & Optimization
1. Load testing
2. Timeout fine-tuning
3. Radius optimization
4. Performance monitoring

## Migration Plan

### Step 1: Schema Updates
1. Add new fields to Delivery model
2. Create DeclinedDeliveryPerson model
3. Update DeliveryStatus enum
4. Run migrations

### Step 2: Code Updates
1. Update API endpoints
2. Add WebSocket events
3. Modify existing assignment logic
4. Update status handling

### Step 3: Testing
1. Test new endpoints
2. Verify WebSocket events
3. Check timeout handling
4. Validate security rules

## Monitoring & Analytics

### Key Metrics
1. Request acceptance rate
2. Average response time
3. Timeout frequency
4. Decline reasons
5. Delivery person availability

### Logging Requirements
1. Request creation
2. Response events
3. Timeout events
4. Status changes
5. Error conditions 