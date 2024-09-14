"use client";

import { ActionState, smsLogin } from "@/app/sms/actions";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with SMS!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        {state.token ? (
          <Input
            name="token"
            required
            type="number"
            min={1_000_000}
            max={9_999_999}
            placeholder="Verification code"
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            required
            type="text"
            placeholder="Phone Number"
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
