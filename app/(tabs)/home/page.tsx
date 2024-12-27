import Button from "@/components/button";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as NextCache, revalidatePath } from "next/cache";
import Link from "next/link";

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

const getCachedProducts = NextCache(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
    orderBy: {
      created_at: "desc",
    },
    // take: 1,
  });

  return products;
}

export const revalidate = 30;

export default async function Product() {
  const initialProducts = await getInitialProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <Button text="revalidate"></Button>
      </form>
      <Link
        href={"/products/add"}
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition hover:scale-95"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
