

import { useAuth } from "../hook/useAuth";
import { Toaster } from "sonner";

const SignUpPage = () => {
  const { signUp } = useAuth();
   

   
  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>SignUp</h1>
  

      <button onClick={signUp}>Sign Up</button>
     
    </div>
  );
};

export default SignUpPage;
