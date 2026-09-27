import AuthForm from "../components/AuthForm";

function SignupPage({ onSwitch }: { onSwitch: () => void }) {
  return <AuthForm mode="signup" onSwitch={onSwitch} />;
}

export default SignupPage;