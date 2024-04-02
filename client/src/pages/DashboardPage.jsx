import { useAuth } from "../hook/useAuth";

const DashboardPage = () => {
  const { authUser, signOut, loading } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome back {authUser?.email}</h2>

      {loading ? (
        <span>loading...</span>
      ) : (
        <button onClick={signOut}>Sing Out</button>
      )}
    </div>
  );
};

export default DashboardPage;
