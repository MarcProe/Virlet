// User type for database storage
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  profileImage?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  instagramId?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Instagram profile data from OAuth
export interface InstagramProfile {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

// Instagram user data
export interface InstagramUserData {
  id: string;
  username: string;
  full_name: string;
  biography: string;
  followers_count: number;
  following_count: number;
  profile_picture: string;
  website?: string;
}

// Session user type
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string;
}

// Widget props
export interface WidgetProps {
  user: User;
}

// Account Info widget specific props
export interface AccountInfoWidgetProps extends WidgetProps {
  showStats?: boolean;
}

// Dashboard layout props
export interface DashboardLayoutProps {
  children: React.ReactNode;
}
