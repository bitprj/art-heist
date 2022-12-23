import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <center>
  <SignUp path="/signup" signInUrl="/signin" />
  </center>
  );

export default SignUpPage;