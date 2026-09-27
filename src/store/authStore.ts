import { create } from "zustand";
import * as authApi from "../api/auth";

interface AuthState {
  accessToken: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// 여러 화면이 함께 봐야 하는 로그인 상태만 전역으로 관리한다
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  email: localStorage.getItem("email"),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = await authApi.login({ email, password });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", email);
      set({ accessToken, email, isLoading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했습니다";
      set({ error: message, isLoading: false });
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.signup({ email, password });
      // 가입에 성공하면 곧바로 로그인까지 이어서 처리한다
      const { accessToken } = await authApi.login({ email, password });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", email);
      set({ accessToken, email, isLoading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "회원가입에 실패했습니다";
      set({ error: message, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    set({ accessToken: null, email: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
