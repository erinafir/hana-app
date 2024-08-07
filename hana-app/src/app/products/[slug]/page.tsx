import type { Metadata, ResolvingMetadata } from "next";
import ButtonWishlist from "@/components/ButtonWishlist";
import { ProductId } from "@/db/models/Product";
import Image from "next/image";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product: ProductId = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`
  ).then((response) => response.json());
  return {
    title: product.name,
    description: product.excerpt,
  };
}

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    {
      cache: "no-store",
    }
  );
  const data: ProductId = await res.json();

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            width={200}
            height={200}
            src={data.thumbnail}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              HANA
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.name}
            </h1>
            <h3 className="text-gray-900 text-xl title-font font-medium mb-1">
              {data.excerpt}
            </h3>
            <p className="leading-relaxed">{data.description}</p>

            <div className="flex flex-row justify-between">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {data.price}
              </span>
              <ButtonWishlist data={data._id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
