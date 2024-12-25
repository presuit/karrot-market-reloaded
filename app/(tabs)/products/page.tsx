import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
    </div>
  );
}
