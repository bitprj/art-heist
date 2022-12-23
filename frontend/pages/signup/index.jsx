import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/signup" signInUrl="/signin" />
  );

export default SignUpPage;