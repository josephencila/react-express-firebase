import { Toaster } from "sonner";
import { useAuth } from "../hooks/useAuth";

const SignInPage = () => {
  const { signIn } = useAuth();



  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>Sign In</h1>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default SignInPage;
