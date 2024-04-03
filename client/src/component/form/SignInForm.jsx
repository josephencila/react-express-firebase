import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Icon } from "@iconify/react";

import { useAuth } from "../../hooks/useAuth";

const SignInForm = () => {
  const { signIn } = useAuth();

  const [togglePwd, setTogglePwd] = useState(false);

  const [user, setUser] = useState({
    email: "bbqa2.supabase@gmail.com",
    password: "ewaewa@Ewa213",
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

    targetValue = targetValue.replace(" ", "");

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
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
            <button onClick={togglePassword}>
              <Icon icon="mdi:eye-outline" />
            </button>
          ) : (
            <button onClick={togglePassword}>
              <Icon icon="mdi:eye-off-outline" />
            </button>
          )}
        </div>
        <small className="form_error-message">{errors.password?.message}</small>
        <button type="submit">Sign In</button>
        <div>
          <small>Dont have an account?</small>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
