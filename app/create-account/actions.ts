"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

function checkPassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  return password === confirmPassword;
}

const checkUniqueUserName = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(userEmail);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "username is required!",
      })
      .trim()
      .toLowerCase()
      .min(3, "way too short!!")
      .max(10, "That is too long!")
      .transform((username) => `${username}`)
      .refine(checkUniqueUserName, "This username is already taken"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, "This email is already taken"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: "Both Passwords should be the same!",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  console.log(result.data);

  // check if username is taken
  // check if email is already used
  // hash password
  // save the user to db
  // log the user in
  // redirect "/home"
}
