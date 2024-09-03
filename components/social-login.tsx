import {
  ChatBubbleOvalLeftEllipsisIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="h-px w-full bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <WrenchIcon className="h-5 w-5" />
          </span>
          <span>Continue with Github</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
