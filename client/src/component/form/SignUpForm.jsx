import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Toaster } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import PasswordValidationCard from "../cards/PasswordValidationCard";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { useAuth } from "../../hooks/useAuth";

const SignUpForm = () => {
  const { signUp, loading } = useAuth();

  const { handleErrorType, errorMessage, multiRegex } = usePasswordValidation();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [toggle, setToggle] = useState(false);

  const schema = z.object({
    fullname: z
      .string()
      .min(1, { message: "Full Name is a required field" })
      .superRefine((data, ctx) => {
        const namesWithSpaceOnly = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
        if (!namesWithSpaceOnly.test(data)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Full Name must only contain single space between names. Numbers and special characters are also not allowed.",
          });
        } else {
          return;
        }
      }),
    email: z
      .string()
      .min(1, { message: "Email is a required field" })
      .email("Email must be a valid email address"),
    password: z
      .string()
      .min(1, { message: "Password is a required field" })
      .superRefine((value, ctx) => {
        multiRegex().map((rgx, idx) => {
          if (!rgx.test(value)) {
            handleErrorType(idx, false);
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: errorMessage[idx],
            });
          } else {
            handleErrorType(idx, true);
          }
        });
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onChange = (e) => {
    var targetName = e.target.name;
    var targetValue = e.target.value;

    var noSpaceAllowed = ["email", "password"];
    console.log(targetName);
    if (noSpaceAllowed.includes(targetName)) {
      targetValue = targetValue.replace(" ", "");
    }

    targetValue = targetValue.replace(
      /(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu,
      ""
    );

    setUser((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onSubmit = () => {
    signUp(user.fullname, user.email, user.password);
  };

  const btnStatus = useMemo(() => {
    return loading ? <Icon icon="line-md:loading-twotone-loop" /> : "Sign Up";
  }, [loading]);

  return (
   
      <form
        className="h-auto min-w-[320px] max-w-[320px] flex flex-col gap-3 p-2 border border-solid"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full h-auto">
          <h1 className="text-3xl font-bold">Sign up free</h1>
          <small>Create a new account</small>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname">Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="John Doe"
            className="h-10 p-2 border border-slate-300"
            value={user.fullname}
            onChange={onChange}
            autoComplete="off"
            {...register("fullname", {
              onChange: onChange,
            })}
          />
          <small className="text-red-500">{errors.fullname?.message}</small>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="example@email.com"
            className="h-10 p-2 border border-slate-300"
            value={user.email}
            onChange={onChange}
            autoComplete="off"
            {...register("email", {
              onChange: onChange,
            })}
          />
          <small className="text-red-500">{errors.email?.message}</small>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <label htmlFor="password">Password</label>
            <NavLink to="#" className="text-sm hover:underline">
              Forgot Password?
            </NavLink>
          </div>
          <div className="relative grid grid-cols-[1fr_50px]  border border-slate-300  rounded-[1.5px] [&:has(:focus-visible)]:outline outline-2  ">
            <input
              type={toggle ? "text" : "password"}
              name="password"
              placeholder="••••••••••••"
              className="h-10 outline-none p-2"
              value={user.password}
              autoComplete="off"
              {...register("password", {
                onChange: onChange,
              })}
            />
            <button
              type="button"
              className="bg-white hover:bg-slate-200 flex justify-center items-center"
              onClick={() => setToggle(!toggle)}
            >
              <Icon
                icon={toggle ? "mdi:eye-outline" : "mdi:eye-off-outline"}
                className="h-5 w-5"
              />
            </button>
          </div>
          <small className="text-red-500">{errors.password?.message}</small>
        </div>
        <PasswordValidationCard />
        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 w-full h-10 text-white hover:opacity-85"
          >
            {btnStatus}
          </button>
          <span className="text-sm flex gap-1">
            Already have an account?
            <NavLink to="/sign-in" className="hover:underline">
              Sign In
            </NavLink>
          </span>
        </div>
      </form>
   
  );
};

export default SignUpForm;
