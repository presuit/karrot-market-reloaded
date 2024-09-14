"use server";

import { z } from "zod";
import { isMobilePhone } from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine((phoneNumber) => {
    return isMobilePhone(phoneNumber, "ko-KR");
  }, "Wrong Phone Format");
const tokenSchema = z.coerce.number().min(1_000_000).max(999_999_999);

export interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phoneNumber = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phoneNumber);
    if (!result.success) {
      console.log(result.error.flatten());
      return { token: false, error: result.error.flatten() };
    } else {
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
