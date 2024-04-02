import { useAuth } from "../../hook/useAuth";

const Dashboard = () => {
  const { authUser } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome back {authUser?.email}</h2>
    </div>
  );
};

export default Dashboard;
