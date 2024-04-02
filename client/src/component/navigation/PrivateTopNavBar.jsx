import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const PrivateTopNavBar = () => {
  const { signOut } = useAuth();
  const links = [
    {
      pathName: "Profile",
      path: "/profile",
    },
  ];
  return (
    <ul>
      {links.map((link, idx) => {
        return (
          <li key={idx}>
            <NavLink to={link.path}>{link.pathName}</NavLink>
          </li>
        );
      })}
      <li>
        <button onClick={signOut}>Sign Out</button>
      </li>
    </ul>
  );
};

export default PrivateTopNavBar;
