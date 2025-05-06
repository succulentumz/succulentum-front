export interface ILifecycleCallbacks {
  onUpdate?: (newToken: string) => void;
  onError?: (error: unknown) => void;
}

export interface IRefreshTokenResponse {
  access: string;
}

export interface IRefreshTokenPayload {
  refresh: string;
}
