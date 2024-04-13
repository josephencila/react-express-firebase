import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../svg/MainLogo";
import { useAuth } from "../../hooks/useAuth";

const MenuBar = () => {
  const { isAuth, signOut } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  
  const memoizedNavLinks = useMemo(() => {
    return isAuth
      ? [
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Profile",
            path: "/profile",
          },
          {
            name: "Employer",
            path: "/employer",
          },
          {
            name: "Sign Out",
            path: "#",
          },
        ]
      : [
          {
            name: "Sign In",
            path: "/sign-in",
          },
          {
            name: "Sign Up",
            path: "/sign-up",
          },
        ];
  }, [isAuth]);


  const handleNav = (name, path) => {
    setToggle(false);
    if (name === "Sign Out") {
      signOut();
    }
    navigate(path);
  };

  return (
    <nav className="w-full h-[60px] z-10 b-blue border border-solid">
      <ul
        className=" w-full h-full px-5 py-3 m-0 list-none grid grid-cols-[1fr_50px] grid-rows-[1fr]
       md:grid-cols-[1fr_repeat(4,auto)] md:gap-2"
      >
        <li className="flex  flex-row items-center">
          <button type="button " className="flex flex-row gap-1">
            <MainLogo className="h-6 w-6" />
            <span className="font-Museo  font-bold">ntern</span>
          </button>
        </li>
        <li className="flex  flex-row justify-center items-center md:hidden ">
          <button type="button" onClick={() => setToggle(!toggle)}>
            <Icon icon="material-symbols:menu" className="h-6 w-6" />
          </button>
        </li>
        {memoizedNavLinks.map((link, idx) => {
          return (
            <li key={idx} className="hidden md:block  p-1">
              <button
                type="button"
                onClick={() => handleNav(link.name, link.path)}
                className="text-sm font-bold   hover:underline "
              >
                {link.name}
              </button>
            </li>
          );
        })}
      </ul>
      <ul
        className={`p-0 m-0 list-none  top-[0] left-[0] right-[0] bottom-[0] bg-white overflow-hidden
        grid grid-cols-[1fr] grid-rows-[repeat(5,60px)] gap-1 md:hidden
        ${toggle ? "fixed" : "hidden"}
    }`}
      >
        <li className=" flex items-center justify-end">
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="mr-8"
          >
            <Icon icon="material-symbols:close" className="h-6 w-6" />
          </button>
        </li>
        {memoizedNavLinks.map((link, idx) => {
          return (
            <li key={idx} className=" flex items-center justify-center  ">
              <button
                type="button"
                className="text-sm font-bold  hover:underline "
                onClick={() => handleNav(link.name, link.path)}
              >
                {link.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MenuBar;
