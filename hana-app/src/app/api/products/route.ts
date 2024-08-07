import Product from "@/db/models/Product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name_like");
  const page = searchParams.get("page");
  const products = await Product.getAll(name, page);
  return Response.json(products);
}