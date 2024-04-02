

import { useAuth } from "../hook/useAuth";
import { Toaster } from "sonner";

const SignUpPage = () => {
  const { signUp,success } = useAuth();
   

   
  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>SignUp</h1>
  
      {success && <span>NOTE:if you provided a valid email, we&apos;ve sent you a verification link.</span>}
      <button onClick={signUp}>Sign Up</button>
     
    </div>
  );
};

export default SignUpPage;
