import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "@iconify/react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import PasswordValidationCard from "../cards/PasswordValidationCard";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { useAuth } from "../../hooks/useAuth";

const SignUpForm = () => {
  const { signUp } = useAuth();

  const { handleErrorType, errorMessage, multiRegex } = usePasswordValidation();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [togglePwd, setTogglePwd] = useState(false);

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

  const togglePassword = () => {
    setTogglePwd(!togglePwd);
  };

  const onSubmit = () => {
    signUp(user.fullname, user.email, user.password);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="fullname"
            name="fullname"
            value={user.fullname}
            placeholder="Full Name"
            autoComplete="off"
            {...register("fullname", {
              onChange: onChange,
            })}
          />
          <small className="form_error-message">
            {errors.fullname?.message}
          </small>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Email"
            autoComplete="off"
            {...register("email", {
              onChange: onChange,
            })}
          />
          <small className="form_error-message">{errors.email?.message}</small>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type={togglePwd ? "text" : "password"}
            name="password"
            value={user.password}
            placeholder="Password"
            autoComplete="off"
            {...register("password", {
              onChange: onChange,
            })}
          />
          {togglePwd ? (
            <button type="button" onClick={togglePassword}>
              <Icon icon="mdi:eye-outline" />
            </button>
          ) : (
            <button type="button" onClick={togglePassword}>
              <Icon icon="mdi:eye-off-outline" />
            </button>
          )}
          <small className="form_error-message">
            {errors.password?.message}
          </small>
        </div>
        <PasswordValidationCard />
        <div>
          <button type="submit">Signup</button>
          <small>Already have an account?</small>
          <NavLink to="/sign-in">Sign In</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
