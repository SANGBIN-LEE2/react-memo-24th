import AuthForm from "../components/AuthForm";

function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  return <AuthForm mode="login" onSwitch={onSwitch} />;
}

export default LoginPage;
