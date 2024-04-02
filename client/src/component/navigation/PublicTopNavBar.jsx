import { NavLink } from "react-router-dom";

const PublicTopNavBar = () => {
 

  const links = [
    {
      pathName: "Sign In",
      path: "/sign-in",
    },
    {
      pathName: "Sign Up",
      path: "/sign-up",
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
    </ul>
  );
};

export default PublicTopNavBar;
