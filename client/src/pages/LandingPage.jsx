import Dashboard from "../component/content/Dashboard";
import Welcome from "../component/content/Welcome";
import { useAuth } from "../hook/useAuth";

const LandingPage = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Dashboard /> : <Welcome />;
};

export default LandingPage;
