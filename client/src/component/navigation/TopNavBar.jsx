import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const TopNavBar = () => {
  const { signOut,authUser } = useAuth();
  return (
    <ul>
      <li>
        <NavLink  to="/sign-in">Sign In</NavLink>
      </li>
      <li>
        <NavLink  to="/sign-up">Sign Up</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
         {authUser && <button onClick={signOut}>Sign Out</button>}
      </li>
    </ul>
  );
};

export default TopNavBar;
