import ButtonWishlist from "@/components/ButtonWishlist";
import { ProductId } from "@/db/models/Product";
import Link from "next/link";


export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products");
  const data: ProductId[] = await res.json();

  return (
    <main className="bg-white">
      <div className="container mx-auto px-6">
        <div
          className="h-64 rounded-md overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://ecinos.id/cdn/shop/files/BannerforLINEN-12_1080x.jpg?v=1720282836")',
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">
                2024 Summer collection
              </h2>

              <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <Link href="/products">Shop Now</Link>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
            style={{
              backgroundImage:
                'url("https://ecinos.id/cdn/shop/files/85B17C44-AD3E-45E7-B57F-FE0C7499A396_360x.jpg?v=1713847248")',
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Top</h2>

                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <Link href="/products">Shop Now</Link>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
            style={{
              backgroundImage:
                'url("https://ecinos.id/cdn/shop/files/78B23E03-11CF-4BE3-8865-D4506A1966C3_360x.jpg?v=1713953064")',
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Set</h2>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <Link href="/products">Shop Now</Link>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex justify-between">
            <h3 className="text-gray-600 text-2xl font-medium">Featured</h3>
            <Link
              href="/products"
              className="text-gray-600 text-lg hover:underline underline-offset-2"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {data.map((el, idx) => {
              return (
                <div key={idx} className="w-full max-w-sm mt-2 mx-auto rounded-md shadow-md overflow-hidden">
                  <div
                    className="flex items-end justify-end h-56 w-full bg-cover"
                    style={{
                      backgroundImage:
                        `url(${el.thumbnail})`,
                    }}
                  >
                    <ButtonWishlist data={el._id} />
                  </div>
                  <div className="px-5 py-3">
                    <h3 className="text-gray-700 uppercase">{el.name}</h3>
                    <span className="text-gray-500 mt-2">Rp {el.price}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
