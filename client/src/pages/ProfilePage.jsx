import { Toaster } from "sonner";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const BASE_URL = "http://localhost:4000";
  const callRequest = async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${authUser?.accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>Profile</h1>
      <h2>Welcome back {authUser?.email}</h2>
        
        <button onClick={callRequest}>Call A Request</button>
    </div>
  );
};

export default ProfilePage;
