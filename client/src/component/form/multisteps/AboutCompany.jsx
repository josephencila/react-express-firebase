import useJobMultiSteps from "../../../hooks/useJobMultiSteps";

const AboutCompany = () => {
  const { formData, register, errors, onChange } = useJobMultiSteps();

  const options = [
    {
      range: "",
    },
    {
      range: "1 to 49",
    },
    {
      range: "50 to 149",
    },
    {
      range: "150 to 249",
    },
    {
      range: "250 to 449",
    },
    {
      range: "500 to 749",
    },
    {
      range: "700 to 999",
    },
    {
      range: "1000+",
    },
  ];

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
      {/* <input
        type="text"
        name="numOfEmployees"
        {...register("numOfEmployees", {
          onChange: onChange,
        })}
      /> */}
      <select
        name="numOfEmployees"
        {...register("numOfEmployees", {
          onChange: onChange,
        })}
      >
        {options.map((o, idx) => {
          return (
            <option value={o.range} key={idx} defaultValue={o.range}>
              {o.range}
            </option>
          );
        })}
      </select>
      <small className="text-red-500">{errors?.numOfEmployees?.message}</small>
    </div>
  );
};

export default AboutCompany;
