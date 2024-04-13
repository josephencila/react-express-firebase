import { useMemo, useState } from "react";
import Editor from "../component/content/Editor";
import Preview from "../component/content/Preview";
import useJobMultiSteps from "../hooks/useJobMultiSteps";
import AboutCompany from "../component/form/multisteps/AboutCompany";
import AboutBasicDetails from "../component/form/multisteps/AboutBasicDetails";
import AboutPayAndbenefits from "../component/form/multisteps/AboutPayAndbenefits";
import AboutFullDescription from "../component/form/multisteps/AboutFullDescription";

const Employer = () => {
  const { steps, prevSteps, nextSteps, handleSubmit, onSubmit } =
    useJobMultiSteps();

  const [preview, setPreview] = useState(false);

  const memoizedPreview = useMemo(() => {
    return preview ? <Preview /> : <></>;
  }, [preview]);

  const memoizeButtons = useMemo(() => {
    return steps < 4 ? (
      <button type="button" onClick={nextSteps}>
        next
      </button>
    ) : (
      <div>
        <button type="button" onClick={setPreview(true)}>
          Preview
        </button>
        <button type="submit">Submit</button>
      </div>
    );
  }, [steps, nextSteps]);

  const updateSteps = (steps) => {
    switch (steps) {
      case 1:
        return <AboutCompany />;
      case 2:
        return <AboutBasicDetails />;
      case 3:
        return <AboutPayAndbenefits />;
      case 4:
        return <AboutFullDescription />;
      default:
        return;
    }
  };

  const memoizeSteps = useMemo(() => {
    return updateSteps(steps);
  }, [steps]);

  return (
    <main className=" h-dvh-60  bg-sky-50 grid grid-cols-[1fr] grid-rows-[1fr]  xl:grid-cols-[repeat(2,1fr)] xl:grid-rows-[1fr] ">
      {/* <p className="text-xl text-center font-bold">Job Description:</p>
      <Editor content={content} setContent={setContent} />
      <button type="button " onClick={() => setPreview(!preview)}>
        Preview
      </button>
      {memoizedPreview} */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-solid border-black"
      >
        {memoizeSteps}
        <div className="flex justify-between">
          <button type="button" onClick={prevSteps}>
            prev
          </button>
          {memoizeButtons}
        </div>
      </form>
    </main>
  );
};

export default Employer;
