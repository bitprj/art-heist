import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/sign-up" signInUrl="/sign-in" />
  );

export default SignUpPage;