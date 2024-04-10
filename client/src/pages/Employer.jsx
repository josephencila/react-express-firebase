import { useState } from "react";
import Editor from "../component/content/Editor";

const Employer = () => {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-2">
      <p className="text-xl text-center font-bold">Job Description:</p>
      <Editor content={content} setContent={setContent} />
      <button type="button " onClick={() => setPreview(!preview)}>
        Preview
      </button>
      {preview && (
        <>
          <p className="text-xl text-center font-bold">Preview</p>
          <div
            className=" w-full min-w-[320px] max-w-xl p-2 focus:outline-none min-h-[480px]  max-h-[480px] overflow-y-auto overflow-x-hidden
             text-justify break-words
            border border-solid border-slate-600 
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      )}
    </div>
  );
};

export default Employer;
