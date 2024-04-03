import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Icon } from "@iconify/react";

import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "sonner";

const SignInForm = () => {
  const { signIn, loading } = useAuth();

  const [togglePwd, setTogglePwd] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is a required field" })
      .email("Email must be a valid email address"),
    password: z.string().min(1, { message: "Password is a required field" }),
  });

  const onChange = (e) => {
    var targetName = e.target.name;
    var targetValue = e.target.value;

    console.log(targetName);
    targetValue = targetValue.replace(" ", "");
    targetValue = targetValue.replace(
      /(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu,
      ""
    );

    setUser((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const togglePassword = () => {
    setTogglePwd(!togglePwd);
  };

  const onSubmit = () => {
    signIn(user.email, user.password);
  };
  return (
    <div>
      <Toaster richColors position="top-right" />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={onChange}
          autoComplete="off"
          {...register("email", {
            onChange: onChange,
          })}
        />
        <small className="form_error-message">{errors.email?.message}</small>
        <div>
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
        <div>
          <button type="submit" disabled={loading}>
            {loading ? <Icon icon="line-md:loading-twotone-loop" /> : "Sign In"  }
          </button>
          <small>Dont have an account?</small>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
