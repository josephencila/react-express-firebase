import SignUpForm from "../component/form/SignUpForm";

const SignUpPage = () => {
  return (
    <main className=" h-dvh-60  bg-sky-50 grid grid-cols-[1fr] grid-rows-[1fr_.5fr]  xl:grid-cols-[repeat(2,1fr)] xl:grid-rows-[1fr] ">
      <div className=" h-full w-full  grid justify-center  items-center ">
        <SignUpForm />
      </div>
      <div className="xl:hidden "></div>
      <div className="hidden xl:flex xl:h-full xl:w-full bg-white">asdasd</div>
    </main>
  );
};

export default SignUpPage;
