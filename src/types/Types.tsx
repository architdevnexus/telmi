// ==========================================
// ✅ Root Redux Types
// ==========================================
export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

export interface UserAuthState {
  user: User | null;
  userId: string | null;
}

// Root State for Redux
export interface RootState {
  userAuthReducer: UserAuthState;
  streamReducer: StreamState;
}

// ==========================================
// ✅ Stream Types
// ==========================================
export interface StreamData {
  token: string;
  category: string;
}

export interface Room {
  _id: string;
  token: string;
  category: string;
  hostId: string;
  createdAt: string;
}

export interface StreamState {
  mode: string;
  createdRoom: Room | null;
  selectedRoom: Room | null;
}

// ==========================================
// ✅ Navigation Types
// ==========================================

// All screens in your app
export type RootStackParamList = {
  bottom_tab: undefined;
  editProfile: undefined;
  stream: undefined;
  home: undefined;
  login: undefined;
};

// Use this type in useNavigation()
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type AppNavigation = NavigationProp<RootStackParamList>;
export type AppRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// ==========================================
// ✅ API Response Types
// ==========================================
export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

// Single Profile API
export interface ProfileResponse {
  profile: User;
}

// Room List API
export type RoomListResponse = Room[];

// Join Room API
export interface JoinRoomResponse {
  message: string;
}
