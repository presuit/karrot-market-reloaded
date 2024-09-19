async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 10_000));
}

export default async function Product() {
  const products = await getProducts();
  return <div></div>;
}
