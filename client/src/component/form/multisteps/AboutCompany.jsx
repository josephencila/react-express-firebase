import useJobMultiSteps from "../../../hooks/useJobMultiSteps";

const AboutCompany = () => {
  const { formData, register, errors, onChange, enumOfEmployees } =
    useJobMultiSteps();

  return (
    <div className="flex flex-col">
      <h1>Company</h1>
      <label htmlFor="companyName">Company Name:</label>
      <input
        type="text"
        name="companyName"
        {...register("companyName", {
          onChange: onChange,
        })}
      />
      <small className="text-red-500">{errors?.companyName?.message}</small>
      <label htmlFor="numOfEmployees">Number of Employees:</label>
      <select
        name="numOfEmployees"
        {...register("numOfEmployees", {
          onChange: onChange,
        })}
      >
        {enumOfEmployees.map((e, idx) => {
          return (
            <option value={e} key={idx}>
              {e}
            </option>
          );
        })}
      </select>
      <small className="text-red-500">{errors?.numOfEmployees?.message}</small>
    </div>
  );
};

export default AboutCompany;
