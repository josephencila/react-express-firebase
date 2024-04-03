


import SignUpForm from "../component/form/SignUpForm";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "sonner";

const SignUpPage = () => {
  const { signUp,success } = useAuth();
   

   
  return (
    <div>
      <Toaster richColors position="top-right" />
   
  
       <SignUpForm/>
     
    </div>
  );
};

export default SignUpPage;
