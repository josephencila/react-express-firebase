import { useState } from "react";
import useJobMultiSteps from "../../../hooks/useJobMultiSteps";

const AboutBasicDetails = () => {
  const {
    formData,
    register,
    errors,
    onChange,
    enumOfVacancies,
    enumOfJobTags,
  } = useJobMultiSteps();
 
  const sampleCB = [
    {
      name: "Choco",
    },
    {
      name: "Iced Tea",
    },
  ];
  return (
    <div className="flex flex-col">
      <h1>Basic Details</h1>
      {sampleCB.map((cb, idx) => {
        return (
          <div key={idx}>
            <input
              type="checkbox"
              key={idx}
              value={cb.name}
              name="jobTags"
              checked={formData?.jobTags[idx]}
              {...register("jobTags", {
                onChange: onChange,
              })}
            />
            <label htmlFor="jobTags">{cb.name}</label>
          </div>
        );
      })}
      {/* <label htmlFor="jobTags">Job Tags:</label>
      <select
        name="jobTags"
        {...register("jobTags", {
          onChange: onChange,
        })}
      >
        {enumOfJobTags.map((e, idx) => {
          return (
            <option value={e} key={idx}>
              {e}
            </option>
          );
        })}
      </select>
      <small className="text-red-500">{errors?.jobTags?.message}</small>

      <label htmlFor="jobTitle">Job Title:</label>
      <input
        type="text"
        name="jobTitle"
        {...register("jobTitle", {
          onChange: onChange,
        })}
      />
      <small className="text-red-500">{errors?.jobTitle?.message}</small>

      <label htmlFor="numOfVacancies">Number of Vacancies:</label>
      <select
        name="numOfVacancies"
        {...register("numOfVacancies", {
          onChange: onChange,
        })}
      >
        {enumOfVacancies.map((e, idx) => {
          return (
            <option value={e} key={idx}>
              {e}
            </option>
          );
        })}
      </select>
      <small className="text-red-500">{errors?.numOfVacancies?.message}</small>
   */}{" "}
    </div>
  );
};

export default AboutBasicDetails;
