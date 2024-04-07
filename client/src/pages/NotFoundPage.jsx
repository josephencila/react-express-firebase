import { NavLink, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <main>
      <Toaster richColors position="top-right" />
      <h1>404 page not found</h1>
      <span>
        The page you are looking for doesnt exist or another error occured.
      </span>
      <NavLink to={location.state?.from}>Go Back</NavLink>
    </main>
  );
};

export default NotFoundPage;
