import Link from "next/link";
import ButtonWishlist from "./ButtonWishlist";
import { ProductId } from "@/db/models/Product";
import Image from "next/image";

export default function ProductCard({ data }: { data: ProductId }) {
  return (
    <>
      <div className="mx-auto w-80 transform overflow-hidden bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <Image
          className="h-48 w-full object-cover object-center"
          width={200}
          height={200}
          src={data.thumbnail}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
            {data.name}
          </h2>
          <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
            {data.excerpt}
          </p>
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            Rp {data.price}
          </p>
          <div className="flex items-center justify-between">
            <Link
              className="hover:underline hover:underline-offset-2"
              href={`/products/${data.slug}`}
            >
              <p>See More</p>
            </Link>
            <ButtonWishlist data={data._id} />
          </div>
        </div>
      </div>
    </>
  );
}
