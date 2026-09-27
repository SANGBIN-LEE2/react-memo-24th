export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  userId: number;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

// 서버는 모든 응답을 이 모양으로 감싸서 준다
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}