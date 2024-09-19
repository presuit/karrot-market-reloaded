"use client";
import {
  HomeIcon as HomeIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  NewspaperIcon as NewspaperIconOutline,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  UserIcon as UserIconOutline,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto grid w-full max-w-screen-sm grid-cols-5 border-t border-neutral-600 px-5 py-3 *:text-white">
      <Link href={"/products"} className="flex flex-col items-center gap-px">
        {pathname === "/products" ? (
          <HomeIconSolid className="h-7 w-7" />
        ) : (
          <HomeIconOutline className="h-7 w-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href={"/life"} className="flex flex-col items-center gap-px">
        {pathname === "/life" ? (
          <NewspaperIconSolid className="h-7 w-7" />
        ) : (
          <NewspaperIconOutline className="h-7 w-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href={"/chats"} className="flex flex-col items-center gap-px">
        {pathname === "/chats" ? (
          <ChatBubbleOvalLeftIconSolid className="h-7 w-7" />
        ) : (
          <ChatBubbleOvalLeftIconOutline className="h-7 w-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link href={"/live"} className="flex flex-col items-center gap-px">
        {pathname === "/live" ? (
          <ShoppingCartIconSolid className="h-7 w-7" />
        ) : (
          <ShoppingCartIconOutline className="h-7 w-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href={"/profile"} className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <UserIconSolid className="h-7 w-7" />
        ) : (
          <UserIconOutline className="h-7 w-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
