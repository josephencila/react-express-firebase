import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
const JobMultiStepsFormContext = createContext({});
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function JobMultiStepsFormContextProvider({ children }) {
  const [formData, setFormData] = useState({
    companyName: "",
    numOfEmployees: "",
    jobTitle: "",
    numOfVacancies: "",
    locationOfAds: "",
    schedule: "",
    duration: "",
    pay: "",
    supplementalPay: [],
    benefits: [],
    fullDescription: "",
  });

  const [steps, setSteps] = useState(1);

  const formDataSchema = z.object({
    companyName: z
      .string()
      .min(1, { message: "Company Name is a required field." }),
    numOfEmployees: z
      .string()
      .min(1, { message: "Number of Employees is a required field." }),
    jobTitle: z.number().min(1, { message: "Job Title is a required field." }),
    numOfVacancies: z
      .string()
      .min(1, { message: "Number of Vacancies is a required field." }),
    locationOfAds: z
      .string()
      .min(1, { message: "Location of Advertise is a required field." }),
    schedule: z.date({ message: "Schedule is a required field." }),
    duration: z.date({ message: "Duration is a required field." }),
    pay: z.string().min(1, { message: "Pay is a required field." }),
    supplementalPay: z
      .array()
      .min(1, { message: "Supplemental Pay is a required field." }),
    benefits: z.array().min(1, { message: "Benefits is a required field." }),
    fullDescription: z
      .string()
      .min(1, { message: "Full Description is a required field." }),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formDataSchema),
    mode: "onChange",
  });

  const handleTrigger = async (props) => {
    if (!Array.isArray(props) || !(props instanceof Array)) {
      return console.log({ message: "Props is not an instance of array" });
    }
    return await trigger(props);
  };

  const prevSteps = () => {
    console.log("prev");
    if (steps <= 0) {
      return;
    }

    setSteps((prev) => prev - 1);
  };
  const nextSteps = async () => {
    let isValid = false;

    const step1 = ["companyName", "numOfEmployees"];
    const step2 = [
      "jobTitle",
      "numOfVacancies",
      "locationOfAds",
      "schedule",
      "duration",
    ];
    const step3 = ["pay", "supplementalPay", "benefits"];
    const step4 = ["fullDescription"];

    switch (steps) {
      case 1:
        isValid = await handleTrigger(step1);
        break;
      case 2:
        isValid = await handleTrigger(step2);
        break;
      case 3:
        isValid = await handleTrigger(step3);
        break;
      case 4:
        isValid = await handleTrigger(step4);
        break;
      default:
        isValid = false;
        break;
    }

    if (isValid) {
      if (steps >= 4) {
        return;
      }

      setSteps((prev) => prev + 1);
    }
  };

  const onChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [targetName]: targetValue,
    }));
  };
  const onSubmit = () => {
    console.log(formData);
  };



  return (
    <JobMultiStepsFormContext.Provider
      value={{
        steps,
        register,
        handleSubmit,
        onSubmit,
        errors,
        prevSteps,
        nextSteps,
        onChange,
      }}
    >
      {children}
      <Outlet />
    </JobMultiStepsFormContext.Provider>
  );
}

export default JobMultiStepsFormContext;

JobMultiStepsFormContextProvider.propTypes = {
  children: PropTypes.func,
};
