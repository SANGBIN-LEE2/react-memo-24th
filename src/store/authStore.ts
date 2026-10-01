import { create } from "zustand";
import * as authApi from "../api/auth";
import { setOnUnauthorized } from "../api/client";
// 토큰이 만료돼 401을 받으면 스토어도 로그아웃 상태로 되돌린다
setOnUnauthorized(() => useAuthStore.getState().logout());

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

// 에러 객체에서 사용자에게 보여줄 문장을 꺼낸다
const toMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

// 로그인 성공 시 토큰을 브라우저에 저장해 새로고침해도 유지되게 한다
const saveSession = (accessToken: string, email: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
};

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
      saveSession(accessToken, email);
      set({ accessToken, email, isLoading: false });
    } catch (error) {
      set({
        error: toMessage(error, "로그인에 실패했습니다"),
        isLoading: false,
      });
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });

    // ① 가입 단계
    try {
      await authApi.signup({ email, password });
    } catch (error) {
      set({
        error: toMessage(error, "회원가입에 실패했습니다"),
        isLoading: false,
      });
      return;
    }

    // ② 자동 로그인 단계: 가입은 이미 끝났으므로 다른 안내를 보여준다
    try {
      const { accessToken } = await authApi.login({ email, password });
      saveSession(accessToken, email);
      set({ accessToken, email, isLoading: false });
    } catch {
      set({
        error: "회원가입은 완료되었습니다. 로그인 화면에서 다시 시도해주세요.",
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    set({ accessToken: null, email: null, error: null });
  },

  clearError: () => set({ error: null }),
}));

// 토큰이 만료돼 401을 받으면 스토어도 로그아웃 상태로 되돌린다
setOnUnauthorized(() => useAuthStore.getState().logout());
