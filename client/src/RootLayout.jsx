import { Outlet } from "react-router-dom";
import PublicTopNavBar from "./component/navigation/PublicTopNavBar";
import { useAuth } from "./hook/useAuth";
import PrivateTopNavBar from "./component/navigation/PrivateTopNavBar";

const RootLayout = () => {
  const { isAuth } = useAuth();
  return (
    <div className="root-layout">
      <nav>{isAuth ? <PrivateTopNavBar /> : <PublicTopNavBar />}</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
