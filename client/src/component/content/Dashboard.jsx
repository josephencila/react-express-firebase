import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { authUser } = useAuth();

  return (
    <main className="bg-sky-50 h-dvh-60">
      <h1>Dashboard</h1>
      <h2>Welcome back {authUser?.email}</h2>
    </main>
  );
};

export default Dashboard;
