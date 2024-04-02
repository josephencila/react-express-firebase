import { Toaster } from "sonner";
import { useAuth } from "../hook/useAuth";

const ProfilePage = () => {
  const { authUser } = useAuth();
  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>Profile</h1>
      <h2>Welcome back {authUser?.email}</h2>

    </div>
  );
};

export default ProfilePage;
