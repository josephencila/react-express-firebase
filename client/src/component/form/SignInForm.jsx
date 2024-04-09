import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Icon } from "@iconify/react";

import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "sonner";

const SignInForm = () => {
  const { signIn, loading } = useAuth();

  const [toggle, setToggle] = useState(false);

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

  const onSubmit = () => {
    signIn(user.email, user.password);
  };

  const btnStatus = useMemo(() => {
    return loading ? <Icon icon="line-md:loading-twotone-loop" /> : "Sign In";
  }, [loading]);
  return (
    <form
      className=" h-auto min-w-[320px] max-w-[320px] flex flex-col gap-3 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1 w-full h-auto">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <small>Sign-in to your account</small>
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

      <div className="flex flex-col gap-3 justify-center items-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 w-full h-10 text-white hover:opacity-85 flex justify-center items-center"
        >
          {btnStatus}
        </button>
        <span className="text-sm flex gap-1">
          Don&apos;t have an account?
          <NavLink to="/sign-up" className="hover:underline">
            Sign Up
          </NavLink>
        </span>
      </div>
    </form>
  );
};

export default SignInForm;
