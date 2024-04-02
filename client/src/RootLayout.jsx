import { Outlet } from "react-router-dom";
import TopNavBar from "./component/navigation/TopNavBar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <nav>
        <TopNavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
