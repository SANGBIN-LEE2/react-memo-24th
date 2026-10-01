import type { ApiResponse } from "../types/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 토큰이 만료됐을 때 실행할 함수. authStore가 자기 자신을 등록한다
let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(handler: () => void) {
  onUnauthorized = handler;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean; // true면 Authorization 헤더에 토큰을 붙인다
}

// 모든 API 요청이 거쳐 가는 공통 함수. 성공하면 data만 꺼내주고 실패하면 서버 메시지로 에러를 던진다
export async function request<TResponse>(
  path: string,
  { method = "GET", body, auth = false }: RequestOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const result = (await response
    .json()
    .catch(() => null)) as ApiResponse<TResponse> | null;

  // 토큰이 만료·위조된 경우에만 로그아웃시킨다 (로그인 실패의 401과 구분)
  if (response.status === 401 && auth) {
    onUnauthorized?.();
  }

  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? "요청에 실패했습니다");
  }

  return result.data;
}
