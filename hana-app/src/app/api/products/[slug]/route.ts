import Product from "@/db/models/Product";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
   const product = await Product.getBySlug(params.slug)
   return Response.json(product);
}