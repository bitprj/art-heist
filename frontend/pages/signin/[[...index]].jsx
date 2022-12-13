import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn path="/signin" routing="path" signUpUrl="/signup" />
  );

export default SignInPage;
