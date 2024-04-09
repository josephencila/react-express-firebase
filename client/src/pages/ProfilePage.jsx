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


  return (
    <main className="bg-sky-50 h-dvh-60">
      
    </main>
  );
};

export default ProfilePage;
