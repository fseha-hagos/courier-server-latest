# Courier Mobile Application

## Overview
Mobile application for delivery personnel ("couriers") to manage deliveries, track locations, and handle package pickups and drop-offs efficiently.

## Tech Stack
- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Navigation**: Expo Router
- **Maps**: React Native Maps
- **Real-time**: Socket.IO Client
- **Storage**: Expo SecureStore
- **Location**: Expo Location

## Core Features

### 1. Authentication & Profile
- Account pre-creation by admin (phone number + vehicle details)
- One-time activation via SMS code
- First-time login with phone & activation code
- Mandatory password setup on first login
- Profile management (name, status)
- Vehicle information viewing
- Online/Offline status toggle

### 2. Delivery Management
- Active deliveries list (ASSIGNED, IN_PROGRESS)
- Delivery details with pickup/dropoff locations
- Delivery status updates (PENDING → ASSIGNED → IN_PROGRESS → COMPLETED/FAILED)
- Delivery proof capture and submission
- Issue reporting system
- Delivery history with pagination
- Performance metrics (completion rate, ratings)

### 3. Navigation & Location
- Real-time GPS tracking with background updates
- Vehicle location broadcasting
- Turn-by-turn navigation to pickup/dropoff
- Location history for deliveries
- Geofencing for pickup/dropoff confirmation
- Automatic status updates based on location

### 4. Real-time Features
- WebSocket connection for live updates
- New delivery assignments
- Package status changes
- Customer messages
- Location updates
- Emergency alerts

### 5. Offline Capabilities
- Cached delivery information
- Offline location tracking
- Action queue for offline operations
- Automatic sync when online
- Persistent authentication

## Data Types

### Package Status Flow
```typescript
enum PackageStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

enum DeliveryStatus {
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DECLINED = 'DECLINED'
}

interface Delivery {
  id: string;
  packageId: string;
  package: Package;
  deliveryPersonId: string;
  vehicleId: string;
  vehicle: Vehicle;
  pickupTime?: Date;
  deliveryTime?: Date;
  estimatedDeliveryTime?: Date;
  currentLocation?: Location;
  status: DeliveryStatus;
  notes: DeliveryNote[];
  deliveryRating?: number;
}

interface DeliveryNote {
  id: string;
  deliveryId: string;
  actorId: string;
  note: string;
  timestamp: Date;
  actorType: 'CUSTOMER' | 'DELIVERY_PERSON' | 'ADMIN';
  location?: Location;
}

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  status?: string;
}
```

## API Integration

### Delivery Person Endpoints
```typescript
interface DeliveryPersonAPI {
  // Status Management
  updateStatus: (status: 'ONLINE' | 'OFFLINE') => Promise<void>;
  updateLocation: (location: Location) => Promise<void>;
  
  // Deliveries
  getCurrentDeliveries: () => Promise<Delivery[]>;
  getDeliveryHistory: (page: number, limit: number) => Promise<{
    deliveries: Delivery[];
    pagination: {
      total: number;
      pages: number;
      currentPage: number;
      limit: number;
    };
  }>;
  
  // Package Operations
  updatePackageStatus: (packageId: string, status: PackageStatus) => Promise<void>;
  addDeliveryNote: (deliveryId: string, note: string) => Promise<void>;
  reportIssue: (packageId: string, issue: string) => Promise<void>;
}
```

### WebSocket Events
```typescript
interface WebSocketEvents {
  'package:update': (event: PackageUpdateEvent) => void;
  'package:assigned': (event: PackageAssignedEvent) => void;
  'package:location': (event: LocationUpdateEvent) => void;
  'package:cancelled': (event: PackageCancelledEvent) => void;
}

interface PackageUpdateEvent {
  status?: PackageStatus;
  location?: Location;
  note?: DeliveryNote;
  timestamp: Date;
}
```

## Implementation Details

### Location Tracking Service
```typescript
const locationTrackingConfig = {
  accuracy: Location.Accuracy.High,
  timeInterval: 5000,
  distanceInterval: 10,
  foregroundService: {
    notificationTitle: "Delivery Tracking Active",
    notificationBody: "Your location is being shared"
  },
  // Android specific
  androidClassification: Location.ActivityType.AUTOMOTIVE_NAVIGATION,
  androidGranularity: Location.Accuracy.HIGH
};

// Background task registration
TaskManager.defineTask(LOCATION_TRACKING_TASK, async ({ data: { locations }, error }) => {
  if (error) return;
  await updateDeliveryPersonLocation(locations[0]);
});
```

### Offline Support
```typescript
interface OfflineAction {
  type: 'STATUS_UPDATE' | 'LOCATION_UPDATE' | 'DELIVERY_NOTE' | 'PACKAGE_STATUS';
  data: any;
  timestamp: Date;
}

interface OfflineStore {
  actions: OfflineAction[];
  addAction: (action: OfflineAction) => void;
  syncActions: () => Promise<void>;
}
```

## Project Structure
```
courier-app/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx              # Phone & activation code login
│   │   ├── set-password.tsx       # First-time password setup
│   │   └── _layout.tsx            # Auth layout (no bottom tabs)
│   ├── (main)/
│   │   ├── home/
│   │   │   ├── index.tsx          # Active deliveries & status
│   │   │   └── settings.tsx       # App settings
│   │   ├── deliveries/
│   │   │   ├── index.tsx          # Current deliveries list
│   │   │   ├── [id]/
│   │   │   │   ├── index.tsx      # Delivery details
│   │   │   │   ├── navigation.tsx # Turn-by-turn navigation
│   │   │   │   └── proof.tsx      # Delivery proof submission
│   │   │   └── history.tsx        # Past deliveries
│   │   ├── profile/
│   │   │   ├── index.tsx          # Profile & stats
│   │   │   └── vehicle.tsx        # Vehicle details
│   │   └── _layout.tsx            # Main layout with bottom tabs
│   └── _layout.tsx                # Root layout
├── src/
│   ├── api/
│   │   ├── auth.ts                # Authentication API
│   │   ├── deliveries.ts          # Delivery operations
│   │   ├── location.ts            # Location updates
│   │   └── websocket.ts           # Real-time connection
│   ├── components/
│   │   ├── delivery/
│   │   │   ├── DeliveryCard.tsx   # Delivery list item
│   │   │   ├── StatusBadge.tsx    # Status indicator
│   │   │   ├── LocationMap.tsx    # Delivery map view
│   │   │   └── Timeline.tsx       # Delivery timeline
│   │   ├── navigation/
│   │   │   ├── BottomTabs.tsx     # Bottom navigation
│   │   │   └── HeaderRight.tsx    # Header actions
│   │   └── shared/
│   │       ├── Button.tsx         # Custom button
│   │       ├── Input.tsx          # Form inputs
│   │       └── ErrorBoundary.tsx  # Error handling
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication state
│   │   ├── useLocation.ts         # Location tracking
│   │   ├── useSocket.ts           # WebSocket management
│   │   └── useOfflineSync.ts      # Offline data sync
│   ├── store/
│   │   ├── auth.ts                # Auth state
│   │   ├── delivery.ts            # Delivery state
│   │   └── offline.ts             # Offline actions
│   └── utils/
│       ├── api.ts                 # API client setup
│       ├── location.ts            # Location helpers
│       ├── storage.ts             # Secure storage
│       ├── permissions.ts         # Permission checks
│       └── constants.ts           # App constants
```

## Development Phases

### Phase 1: Foundation
- [ ] Project setup with Expo
- [ ] Basic navigation structure
- [ ] Authentication flow
- [ ] Profile management
- [ ] Basic offline storage

### Phase 2: Core Features
- [ ] Active deliveries list
- [ ] Delivery details view
- [ ] Location tracking
- [ ] Basic maps integration
- [ ] Real-time updates

### Phase 3: Enhanced Features
- [ ] Turn-by-turn navigation
- [ ] Delivery proof capture
- [ ] Earnings tracking
- [ ] Push notifications
- [ ] Performance optimization

### Phase 4: Advanced Features
- [ ] Route optimization
- [ ] Batch deliveries
- [ ] Analytics dashboard
- [ ] Chat support
- [ ] Emergency features

## Technical Considerations

### Authentication Flow
```typescript
// Auth API Configuration
interface AuthConfig {
  baseUrl: string;
  endpoints: {
    activate: '/api/auth/phone/activate';
    setPassword: '/api/set-password';
    login: '/api/auth/login';
    logout: '/api/auth/logout';
    session: '/me';
  }
}

// User Profile Type (matching backend schema)
interface CourierProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  role: 'DELIVERY_PERSON';
  status: 'ONLINE' | 'OFFLINE';
  averageRating: number;
  completedDeliveries: number;
  failedDeliveries: number;
  vehicles: Vehicle[];
}

// Vehicle Type
interface Vehicle {
  id: string;
  type: 'VAN' | 'BIKE' | 'MOTORCYCLE' | 'CAR';
  licensePlate: string;
  maxWeight: number;
  deliveryPersonId: string;
  currentLatitude?: number;
  currentLongitude?: number;
}

// Auth Store
interface AuthState {
  token: string | null;
  user: CourierProfile | null;
  isFirstLogin: boolean;
  isOnline: boolean;
  setToken: (token: string) => void;
  setOnlineStatus: (status: boolean) => void;
  completeFirstLogin: () => void;
  logout: () => void;
}

// First Login Response
interface ActivationResponse {
  success: boolean;
  requirePasswordSetup: boolean;
  token: string;
  user: CourierProfile;
}
```

### Authentication Screens Flow

1. **First Time Login** (`app/(auth)/login.tsx`)
   ```typescript
   interface LoginForm {
     phoneNumber: string;    // Pre-registered by admin
     activationCode: string; // Received via SMS
   }
   ```
   - Enter registered phone number
   - Enter activation code from SMS
   - Redirect to password setup if first login

2. **Password Setup** (`app/(auth)/set-password.tsx`)
   - Required only on first login
   - Set permanent password
   - Redirect to main app after setup

3. **Regular Login** (`app/(auth)/login.tsx`)
   ```typescript
   interface RegularLoginForm {
     phoneNumber: string;
     password: string;
   }
   ```
   - Login with phone number
   - Enter password
   - Direct access to main app

4. **Session Management**
   - Secure token storage using Expo SecureStore
   - Auto-logout on token expiration
   - Background session refresh

### Implementation Example
```typescript
// src/hooks/useAuth.ts
export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,
  isFirstLogin: false,
  isOnline: false,

  async activate(phone: string, code: string) {
    try {
      const response = await api.post<ActivationResponse>('/api/auth/phone/activate', {
        phoneNumber: phone,
        activationCode: code
      });

      set({ 
        token: response.data.token,
        user: response.data.user,
        isFirstLogin: response.data.requirePasswordSetup
      });

      if (response.data.requirePasswordSetup) {
        router.push('/auth/set-password');
      } else {
        router.push('/home');
      }
    } catch (error) {
      throw new Error('Invalid activation code');
    }
  },

  async setPassword(newPassword: string) {
    try {
      await api.post('/api/set-password', { newPassword });
      set({ isFirstLogin: false });
      router.push('/home');
    } catch (error) {
      throw new Error('Failed to set password');
    }
  }
}));
```

### API Integration
```typescript
// Example Delivery Type
interface Delivery {
  id: string;
  status: DeliveryStatus;
  pickup: Location;
  dropoff: Location;
  customer: CustomerInfo;
  package: PackageInfo;
  timeline: DeliveryEvent[];
}
```

### Location Tracking
```typescript
// Location Service Configuration
const locationConfig = {
  accuracy: Location.Accuracy.High,
  timeInterval: 5000,
  distanceInterval: 10,
  foregroundService: {
    notificationTitle: "Tracking Active",
    notificationBody: "Location tracking is enabled"
  }
};
```

## Security Considerations
- Secure storage for auth tokens
- Location data privacy
- API request encryption
- Offline data protection
- Session management
- Device security requirements

## Performance Optimization
- Image optimization
- Location update batching
- Offline first architecture
- Memory management
- Battery optimization
- Network efficiency

## Testing Strategy
- Unit tests for business logic
- Integration tests for API
- E2E tests for critical flows
- Performance testing
- Offline capability testing
- Location accuracy testing

## Deployment Checklist
- [ ] Code signing setup
- [ ] Environment configuration
- [ ] App store assets
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Support documentation
- [ ] Release notes template

## Future Enhancements
- Multi-language support
- Dark mode
- Voice navigation
- AR package scanning
- Advanced analytics
- Integration with wearables

## Notes
- This document will be updated as development progresses
- Features may be adjusted based on user feedback
- Performance metrics will be added during development 