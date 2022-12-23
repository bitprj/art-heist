import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <center>
  <SignIn path="/signin" routing="path" signUpUrl="/signup" />
  </center>
  );

export default SignInPage;
