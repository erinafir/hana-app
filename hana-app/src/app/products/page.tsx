"use client";
import ProductCard from "@/components/ProductCard";
import { ProductId } from "@/db/models/Product";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Product() {
  const [product, setProduct] = useState<ProductId[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function fetchHome() {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}`;
    if (query) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?name_like=${query}`;
      setPage(1);
    }
    const response = await fetch(url, { method: "GET", cache: "no-store" });
    const data = await response.json();
    if (query) {
      setProduct(data);
      setHasMore(false);
    } else {
      setProduct((prev) => {
        return [...prev, ...data];
      });
      setPage(page + 1);
      if (data.length === 0) {
        setHasMore(false);
      }
    }
  }

  useEffect(() => {
    fetchHome();
  }, [query]);

  return (
    <>
      <div className="flex flex-row flex-1 h-full">
        <div className="flex w-1/4 bg-white">
          <div className="flex-1 px-1 py-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Product..."
              />
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={product.length}
          next={fetchHome}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-3 w-full px-5 py-5 gap-2 bg-white">
            {product.map((el, idx) => {
              return <ProductCard data={el} key={idx} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
