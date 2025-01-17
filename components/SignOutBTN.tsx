"use client";

import { signOut } from "next-auth/react";

function SignOutBTN() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      type="submit"
      className="block px-2 py-1 bg-slate-200 text-gray-700 hover:bg-slate-100 transition-all rounded-md"
    >
      Sign Out
    </button>
  );
}

export default SignOutBTN;
