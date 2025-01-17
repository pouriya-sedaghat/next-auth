import SignOutBTN from "@/components/SignOutBTN";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Out",
  };
}

function SignOut() {
  return (
    <div className="gird grid-cols-1 justify-items-center content-center h-full">
      <SignOutBTN />
    </div>
  );
}

export default SignOut;
