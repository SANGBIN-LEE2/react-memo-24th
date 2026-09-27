import { useState } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthFormProps {
  mode: "login" | "signup";
  onSwitch: () => void;
}

function AuthForm({ mode, onSwitch }: AuthFormProps) {
  // 입력값은 이 화면에서만 쓰므로 지역 상태(useState)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 결과는 앱 전체가 함께 봐야 하므로 전역 상태(zustand)
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const clearError = useAuthStore((state) => state.clearError);

  const isLogin = mode === "login";
  // 피그마: 아이디·비밀번호를 모두 입력해야 로그인 버튼이 활성화된다
  const canSubmit = email.trim() !== "" && password.trim() !== "" && !isLoading;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-[560px] max-w-full flex-col gap-10"
      >
        <h1 className="sr-only">{isLogin ? "로그인" : "회원가입"}</h1>

        {/* 입력 영역: 피그마 gap 16 */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="아이디를 입력하세요"
            className="h-14 w-full rounded-xl bg-white00 px-5 py-4 text-field-medium text-blue07 outline-none placeholder:text-gray02"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            placeholder="비밀번호를 입력하세요"
            className="h-14 w-full rounded-xl bg-white00 px-5 py-4 text-field-medium text-blue07 outline-none placeholder:text-gray02"
          />

          {/* 실패: 서버가 준 메시지를 입력창 아래에 보여준다 */}
          {error && (
            <p role="alert" className="text-body-small text-alert01">
              *{error}
            </p>
          )}
        </div>

        {/* 버튼 + 링크: 피그마 gap 28 */}
        <div className="flex flex-col items-center gap-7">
          {/* 로딩·비활성: 입력이 비었거나 요청 중이면 누를 수 없다 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-14 w-full cursor-pointer rounded-xl bg-blue05 text-action-medium text-white00 disabled:cursor-not-allowed disabled:bg-blue03"
          >
            {isLoading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
          </button>

          <div className="flex items-center gap-4 text-body-small text-gray03">
            <button
              type="button"
              onClick={() => {
                clearError();
                onSwitch();
              }}
              className="cursor-pointer"
            >
              {isLogin ? "회원가입" : "로그인"}
            </button>
            <span aria-hidden="true">|</span>
            <span>아이디 찾기</span>
            <span aria-hidden="true">|</span>
            <span>비밀번호 찾기</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
