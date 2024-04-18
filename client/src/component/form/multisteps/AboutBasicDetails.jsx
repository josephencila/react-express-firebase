import useJobMultiSteps from "../../../hooks/useJobMultiSteps";
import { sortAlpabhetically } from "../../../helper/helper";
import { enumPHCities } from "../../../utils/phCities";

const AboutBasicDetails = () => {
  const {
    formData,
    register,
    errors,
    onChange,
    enumOfVacancies,
    enumOfJobTags,
  } = useJobMultiSteps();

  const sortedCities = () => {
    return sortAlpabhetically(enumPHCities);
  };
  return (
    <div className="flex flex-col">
      <h1>Basic Details</h1>
      <label htmlFor="jobTag">Job Tag:</label>
      <select
        name="jobTag"
        {...register("jobTag", {
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
      {/* {enumOfJobTags.map((e, idx) => {
        return (
          <div key={idx}>
            <input
              key={idx}
              type="checkbox"
              name="jobTag"
              value={e}
              checked={formData?.jobTag.includes(e)}
              {...register("jobTag", {
                onChange: onChange,
              })}
            />
            <label htmlFor="checkbox">{e}</label>
          </div>
        );
      })} */}
      <span className="text-red-500">{errors?.jobTags?.message}</span>

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
      <label htmlFor="locationOfAds">Location of Advertise:</label>
      <select
        name="locationOfAds"
        {...register("locationOfAds", {
          onChange: onChange,
        })}
      >
        {sortedCities().map((e, idx) => {
          return (
            <option value={e} key={idx}>
              {e}
            </option>
          );
        })}
      </select>
      <small className="text-red-500">{errors?.locationOfAds?.message}</small>
    </div>
  );
};

export default AboutBasicDetails;
