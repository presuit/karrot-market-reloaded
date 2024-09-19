"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email and password!</h2>
      </div>
      <form action={action} className="flex flex-col gap-5">
        <Input
          name="email"
          required
          type="email"
          placeholder="Email"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          required
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
