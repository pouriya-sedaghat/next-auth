import SignInForm from "@/components/SignInForm";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
  };
}

async function SignIn() {
  return (
    <div className="gird grid-cols-1 justify-items-center content-center h-full">
      <SignInForm />
    </div>
  );
}

export default SignIn;
