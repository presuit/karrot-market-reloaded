import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

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
    take: 1,
  });

  return products;
}

export default async function Product() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href={"/products/add"}
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition hover:scale-95"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
