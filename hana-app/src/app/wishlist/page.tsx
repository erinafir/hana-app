"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

interface Wishlist {
  _id: string;
  productId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  productData: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: string;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  async function readWishlist() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    setWishlist(data);
  }

  async function handleDelete(_id: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    Swal.fire({
      title: "Item removed From wishlist",
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    readWishlist();
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col mx-auto bg-white w-full h-full p-4">
        <h3 className="text-black text-2xl text-center font-thin">Wishlist</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {wishlist.map((el, idx) => {
            return (
              <div
                key={idx}
                className="w-full max-w-sm mt-2 mx-auto rounded-md shadow-md overflow-hidden"
              >
                <div
                  className="flex items-end justify-end h-56 w-full bg-cover"
                  style={{
                    backgroundImage: `url("${el.productData?.thumbnail}")`,
                  }}
                >
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="p-2 rounded-full bg-red-500 text-white mx-5 -mb-4 hover:bg-red-800 focus:outline-none focus:bg-red-800"
                  >
                    <MdOutlineDeleteOutline size={20} />
                  </button>
                </div>
                <div className="px-5 py-3">
                  <h3 className="text-gray-700 uppercase">
                    {el.productData?.name}
                  </h3>
                  <span className="text-gray-500 mt-2">
                    Rp {el.productData?.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
