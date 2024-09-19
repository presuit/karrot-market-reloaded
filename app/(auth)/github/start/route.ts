import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export function GET() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseUrl}?${formattedParams}`;

  return redirect(finalUrl);
}

// http://localhost:3000/github/complete?code=8322084d82ab3ab11aa1
