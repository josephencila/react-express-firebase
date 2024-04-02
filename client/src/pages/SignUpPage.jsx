import { NavLink } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { Toaster } from "sonner";
const SignUpPage = () => {
  const { signUp, signIn, signOut,authUser } = useAuth();
  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>SignUp</h1>
      <h2>Welcome Back {authUser?.email}</h2>
    
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
          <button onClick={signOut}>Sign Out</button>
      
       <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );
};

export default SignUpPage;
