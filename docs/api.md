# Package Management API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All API endpoints require authentication. Include the authentication token in the request header:
```
Authorization: Bearer <token>
```

## Package Status Flow
```
PENDING → ASSIGNED → IN_PROGRESS → COMPLETED/FAILED
                 └─────────────────→ CANCELLED
```

## WebSocket Events
Connect to WebSocket server at `ws://localhost:3000` for real-time updates.

### Subscribe to Package Updates
```javascript
socket.emit('subscribe:package', packageId);
```

### Event Types
- `package:update` - General package updates
- `package:cancelled` - Package cancellation events
- `package:assigned` - Package assignment events
- `package:location` - Location updates
- `package:requires_attention` - Attention required events
- `package:dispute_created` - New dispute events

## REST API Endpoints

### Packages

#### Get All Packages
```http
GET /packages
```
Returns all active packages with their current status and location.

**Response**
```json
{
  "success": true,
  "packages": [
    {
      "id": "string",
      "status": "PENDING",
      "description": "string",
      "weight": "number",
      "pickupLocation": {},
      "deliveryLocation": {},
      "currentLocation": {},
      "delivery": {}
    }
  ]
}
```

#### Get Package by ID
```http
GET /packages/:id
```
Returns detailed information about a specific package.

**Response**
```json
{
  "success": true,
  "package": {
    "id": "string",
    "status": "PENDING",
    "description": "string",
    "weight": "number",
    "pickupLocation": {},
    "deliveryLocation": {},
    "currentLocation": {},
    "delivery": {},
    "locationHistory": []
  }
}
```

#### Create Package
```http
POST /packages
```

**Request Body**
```json
{
  "customerId": "string",
  "description": "string",
  "weight": "number",
  "pickup": {
    "placeId": "string",
    "address": "string",
    "latitude": "number",
    "longitude": "number"
  },
  "delivery": {
    "placeId": "string",
    "address": "string",
    "latitude": "number",
    "longitude": "number"
  },
  "labels": [
    {
      "value": "string",
      "label": "string"
    }
  ]
}
```

#### Update Package Status
```http
PUT /packages/:id/status
```

**Request Body**
```json
{
  "status": "ASSIGNED | IN_PROGRESS | COMPLETED | FAILED | CANCELLED"
}
```

#### Assign Package
```http
POST /packages/:id/assign
```

**Request Body**
```json
{
  "deliveryPersonId": "string",
  "vehicleId": "string"
}
```

#### Cancel Package
```http
POST /packages/:id/cancel
```

**Request Body**
```json
{
  "reason": "string",
  "canceledBy": {
    "id": "string",
    "type": "CUSTOMER | DELIVERY_PERSON | ADMIN"
  },
  "note": "string"
}
```

### Delivery Persons

#### Get Available Delivery Persons
```http
GET /packages/:id/delivery-persons
```
Returns delivery persons available for package assignment.

**Response**
```json
{
  "success": true,
  "deliveryPersons": [
    {
      "id": "string",
      "name": "string",
      "phoneNumber": "string",
      "rating": "number",
      "currentLocation": {
        "latitude": "number",
        "longitude": "number"
      },
      "vehicle": {
        "id": "string",
        "type": "string",
        "plateNumber": "string",
        "maxWeight": "number"
      }
    }
  ]
}
```

#### Get Nearby Delivery Persons
```http
GET /packages/:id/nearby-delivery-persons
```

**Query Parameters**
- `latitude` (required): Pickup location latitude
- `longitude` (required): Pickup location longitude
- `radius` (optional): Search radius in meters (default: 10000)

### Package Operations

#### Rate Delivery
```http
POST /packages/:id/rate
```

**Request Body**
```json
{
  "rating": "number (1-5)",
  "comment": "string"
}
```

#### Add Delivery Note
```http
POST /packages/:id/notes
```

**Request Body**
```json
{
  "note": "string",
  "actorId": "string",
  "actorType": "CUSTOMER | DELIVERY_PERSON | ADMIN",
  "locationId": "string"
}
```

#### Get Package History
```http
GET /packages/:id/history
```
Returns complete package timeline including status changes, location updates, and notes.

#### Get Estimated Delivery Time
```http
GET /packages/:id/estimated-delivery-time
```
Returns estimated delivery time based on current location and traffic conditions.

## Error Codes

### Package Error Codes
- `INVALID_STATUS_TRANSITION`: Invalid package status transition attempted
- `CANCELLATION_NOT_ALLOWED`: Package cancellation not allowed in current state
- `INVALID_ASSIGNMENT`: Invalid package assignment attempt
- `DELIVERY_PERSON_UNAVAILABLE`: Selected delivery person is not available
- `VEHICLE_WEIGHT_EXCEEDED`: Package weight exceeds vehicle capacity

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Cancellation Rules

### By Package Status
1. **PENDING**
   - Allowed by: CUSTOMER, ADMIN
   - Refund: 100%
   - Penalty: 0%

2. **ASSIGNED**
   - Allowed by: CUSTOMER, DELIVERY_PERSON, ADMIN
   - Time limit: 15 minutes after assignment
   - Refund: 80%
   - Penalty:
     - Customer: 20%
     - Delivery Person: 50%

3. **IN_PROGRESS**
   - Allowed by: ADMIN only
   - Refund: 50%
   - Penalty: 50%

4. **COMPLETED**
   - Allowed by: ADMIN only
   - Refund: 0%
   - Penalty: 100%

5. **FAILED**
   - Allowed by: ADMIN only
   - Refund: 100%
   - Penalty: 0%

## WebSocket Event Details

### package:update
```typescript
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
    timestamp: Date;
}
```

### package:cancelled
```typescript
interface PackageCancelledEvent {
    packageId: string;
    reason: string;
    by: {
        id: string;
        type: string;
    };
    refundAmount?: number;
    timestamp: Date;
}
```

### package:assigned
```typescript
interface PackageAssignedEvent {
    packageId: string;
    timestamp: Date;
    deliveryPerson: {
        id: string;
        name: string;
        phoneNumber?: string;
        vehicle: {
            type: string;
            plateNumber: string;
        };
    };
}
```

### package:location
```typescript
interface LocationUpdateEvent {
    packageId: string;
    location: {
        latitude: number;
        longitude: number;
        address?: string;
        status?: string;
    };
    timestamp: Date;
}
``` 