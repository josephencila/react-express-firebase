import { useAuth } from "../hooks/useAuth";
import { Icon } from "@iconify/react";
const VerificationPage = () => {
  const { authUser, resendEmailVerification } = useAuth();
  return (
    <main>
      <h1>Please verify your email</h1>
      <Icon icon="ic:baseline-email" />
      <span>You&apos;re almost there! We sent an email to</span>
      <h2>{authUser?.email}</h2>

      <p>
        just click on that link in that email to complete your signup if you
        don&apos;t see it, you may need to <b>check your spam</b> folder
      </p>
      <span>still can&apos;t find them email? No Problem.</span>
      <button onClick={resendEmailVerification}>
        Resend Verification Email
      </button>
    </main>
  );
};

export default VerificationPage;
