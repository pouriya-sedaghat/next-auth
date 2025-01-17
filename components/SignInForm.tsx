"use client";

import { z } from "zod";

import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";

const userSchema = z.object({
  email: z.string().email("Invalid Email."),
  password: z.string().min(5, "Password Must Be Least At 5 Character long."),
});

type User = z.infer<typeof userSchema>;

function SignInForm() {
  const [err, setErr] = useState<{
    email: string | undefined;
    password: string | undefined;
  }>({ email: undefined, password: undefined });

  const { data: session } = useSession();

  const router = useRouter();

  const redirect = useSearchParams().get("redirect");

  async function submitHandler(formData: FormData) {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password)
      return setErr({
        email: email ? undefined : "Please Enter Your Email.",
        password: password ? undefined : "Please Enter Your Password.",
      });

    const user: User = { email, password };

    const result = userSchema.safeParse(user);

    if (result.error) {
      const zodErrors = result.error.errors;

      const email = zodErrors.find(
        (item) => item.path.join("") === "email"
      )?.message;
      const password = zodErrors.find(
        (item) => item.path.join("") === "password"
      )?.message;

      const errors = { email, password };

      setErr(errors);

      return;
    }

    setErr({ email: undefined, password: undefined });

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) console.log("Faild To Sign In.");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (session?.user) router.push("/signout");
  }, [session, router, redirect]);

  return (
    <form
      action={submitHandler}
      className="bg-slate-100 text-gray-700 p-4 rounded-md"
    >
      <h2 className="mb-2">Sign IN</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          className="px-2 py-1 my-1 bg-transparent border border-gray-600 rounded-md"
          placeholder="Enter Your Email"
          autoFocus
        />
        {err.email && <small className="block text-red-500">{err.email}</small>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          className="px-2 py-1 my-1 bg-transparent border border-gray-600 rounded-md"
          placeholder="Enter Your Password"
          autoFocus
        />
        {err.password && (
          <small className="block text-red-500">{err.password}</small>
        )}
      </div>
      <button
        type="submit"
        className="block mx-auto px-2 py-1 mt-4 bg-gray-600 text-slate-100 hover:bg-slate-700 transition-all rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

export default SignInForm;
