import { request } from "./client";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../types/auth";

export const signup = (body: SignupRequest) =>
  request<SignupResponse>("/api/auth/signup", { method: "POST", body });

export const login = (body: LoginRequest) =>
  request<LoginResponse>("/api/auth/login", { method: "POST", body });
