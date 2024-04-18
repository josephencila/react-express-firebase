import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enumOfJobTags } from "../utils/enumJobTags";
import { enumPHCities } from "../utils/phCities";

const JobMultiStepsFormContext = createContext({});

export function JobMultiStepsFormContextProvider({ children }) {
  const [formData, setFormData] = useState({
    companyName: "",
    numOfEmployees: "",
    jobTag: "",
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

  const enumOfEmployees = [
    "",
    "1 to 49",
    "50 to 149",
    "150 to 249",
    "250 to 449",
    "500 to 749",
    "700 to 999",
    "1000+",
  ];
  const enumOfVacancies = [
    "",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10+",
  ];

  const sliceEnumHelper = (slice, enums) => {
    const newEnums = enums.slice(slice).map((e) => {
      return e;
    });

    return newEnums;
  };

  const slicedEnumOfEmployees = sliceEnumHelper(1, enumOfEmployees);
  const slicedEnumOfJobTag = sliceEnumHelper(1, enumOfJobTags);
  const slicedEnumOfVacancies = sliceEnumHelper(1, enumOfVacancies);
  const slicedlocationOfAds = sliceEnumHelper(1, enumPHCities);
  const [steps, setSteps] = useState(1);

  const formDataSchema = z.object({
    companyName: z
      .string()
      .min(1, { message: "Company Name is a required field." }),
    numOfEmployees: z.enum(slicedEnumOfEmployees, {
      errorMap: () => ({ message: "Number of Employees is a required field." }),
    }),
    jobTags: z.enum(slicedEnumOfJobTag, {
      errorMap: () => ({
        message: "Job Tag is a required field.",
      }),
    }),
    // z
    //   .array(z.string())
    //   .min(1, { message: "Job Tags is a required field." }),
    jobTitle: z.string().min(1, { message: "Job Title is a required field." }),
    numOfVacancies: z.enum(slicedEnumOfVacancies, {
      errorMap: () => ({
        message: "Number of Vancancies is a required field.",
      }),
    }),
    locationOfAds: z.enum(slicedlocationOfAds, {
      errorMap: () => ({
        message: "Location of Advertise is a required field.",
      }),
    }),
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
    formState: { errors, isSubmitting },
  } = useForm({
    // defaultValues: {
    //   jobTags: formData.jobTag,
    // },
    resolver: zodResolver(formDataSchema),
    mode: "onChange",
  });

  const handleTrigger = async (props) => {
    if (!Array.isArray(props) || !(props instanceof Array)) {
      return console.log({ message: "Props is not an instance of array" });
    }
    return await trigger(props);
  };

  const getKeysBySlice = (object, start, end) => {
    const slicedKeys = Object.keys(object)
      .slice(start, end)
      .map((keys) => {
        return keys;
      });
    return slicedKeys;
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

    switch (steps) {
      case 1:
        isValid = await handleTrigger(getKeysBySlice(formData, 0, 2));
        break;
      case 2:
        isValid = await handleTrigger(getKeysBySlice(formData, 2, 7));
        break;
      case 3:
        isValid = await handleTrigger(getKeysBySlice(formData, 7, 10));
        break;
      case 4:
        isValid = await handleTrigger(getKeysBySlice(formData, 10, 11));
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
    const { name, value, checked } = e.target;
    console.log(name, value, checked);

    const enums = [""];
    const nonEnums = [
      "companyName",
      "numOfEmployees",
      "jobTag",
      "jobTitle",
      "numOfVacancies",
      "locationOfAds",
      "schedule",
      "duration",
      "pay",
    ];

    if (enums.includes(name)) {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: [...prev[name].filter((e) => e !== value)],
        }));
      }
    }

    if (nonEnums.includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const onSubmit = () => {
    console.log(formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <JobMultiStepsFormContext.Provider
      value={{
        steps,
        register,
        isSubmitting,
        handleSubmit,
        onSubmit,
        errors,
        prevSteps,
        nextSteps,
        onChange,
        enumOfEmployees,
        enumOfVacancies,
        enumOfJobTags,
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
