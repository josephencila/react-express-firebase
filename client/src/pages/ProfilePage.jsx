import { Toaster } from "sonner";
import { useAuth } from "../hooks/useAuth";
import PdfContainer from "../component/upload/PdfContainer";
import "@uploadthing/react/styles.css";

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

  const capitalizeName = (name) => {
    const cap = name
      .split(" ")
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
    return cap;
  };

  return (
    <main className="bg-sky-50 h-dvh-60">
      <Toaster richColors position="top-right" />
      <h1>Profile</h1>
      <h2>Welcome back {capitalizeName(authUser?.displayName)}</h2>
      <PdfContainer />
      <button onClick={callRequest}>Call A Request</button>
    </main>
  );
};

export default ProfilePage;
