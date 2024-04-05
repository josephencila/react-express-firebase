import { useAuth } from "../../hooks/useAuth";
import { Toaster, toast } from "sonner";
import { UploadButton } from "./UploadButton";
import { useState } from "react";
import PageSpinner from "../spinner/PageSpinner";

const PdfContainer = () => {
  const { authUser } = useAuth();

  const [loading, setLoading] = useState(false);
  return (
    <div className="pdf-container">
      <Toaster richColors position="top-right" />
      {loading ? (
        <PageSpinner />
      ) : (
        <UploadButton
          endpoint="pdfUploader"
          headers={async () => {
            return {
              Authorization: `Bearer ${123}`,
            };
          }}
          appearance={{
            button:{
              background: '#03A6FF'
            }
          }}
          content={{
            button: <small>Upload Resume</small>,
          }}
          onUploadError={(error) => {
            if (error) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, [1000]);
            }
            return toast.error(error.message);
          }}
          onClientUploadComplete={(res) => {
            console.log("Files: ", res[0]?.url);
            return toast.success("Uploaded successfully.");
          }}
          onBeforeUploadBegin={(files) => {
            return files.map(
              (f) => new File([f], "custom-" + f.name, { type: f.type })
            );
          }}
          onUploadBegin={(name) => {
            console.log("Uploading: ", name);
          }}
        />
      )}
    </div>
  );
};

export default PdfContainer;
