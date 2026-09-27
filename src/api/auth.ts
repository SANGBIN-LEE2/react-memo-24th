import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../types/auth";

const BASE_URL = "https://3-37-186-61.nip.io";

// 공통 POST 요청. 성공하면 data만 꺼내주고, 실패하면 서버 메시지로 에러를 던진다
async function postJson<TRequest, TResponse>(
  path: string,
  body: TRequest,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = (await response
    .json()
    .catch(() => null)) as ApiResponse<TResponse> | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? "요청에 실패했습니다");
  }

  return result.data;
}

export const signup = (body: SignupRequest) =>
  postJson<SignupRequest, SignupResponse>("/api/auth/signup", body);

export const login = (body: LoginRequest) =>
  postJson<LoginRequest, LoginResponse>("/api/auth/login", body);
