import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import MenuBar from "./component/navigation/MenuBar";

const RootLayout = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="grid grid-cols-[1fr] grid-rows-[60px_1fr] h-full w-full ">
        <MenuBar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
