"use server";

import crypto from "crypto";
import { z } from "zod";
import { isMobilePhone } from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });

  return Boolean(exists);
}

const phoneSchema = z
  .string()
  .trim()
  .refine((phoneNumber) => {
    return isMobilePhone(phoneNumber, "ko-KR");
  }, "Wrong Phone Format");
const tokenSchema = z.coerce
  .number()
  .min(1_000_000)
  .max(999_999_999)
  .refine(tokenExists, "존재하지 않는 토큰입니다.");

export interface ActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(1_000_000, 999_999_999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (exists) {
    return getToken();
  }

  return token;
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
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });
      // send the token using twillio
      return { token: true };
    }
  } else {
    const result = await tokenSchema.spa(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (token) {
        const session = await getSession();
        session.id = token.userId;
        await session.save();
        await db.sMSToken.delete({
          where: {
            id: token.id,
          },
        });
      }

      // get the userId of token
      // log the user in
      redirect("/profile");
    }
  }
}
