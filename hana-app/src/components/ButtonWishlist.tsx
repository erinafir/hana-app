"use client";

import Swal from "sweetalert2";

export default function ButtonWishlist({ data }: { data: string }) {
  const handleAddWishlist = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return Swal.fire({
            title: "Please login first!",
            icon: "error",
          });
      }
      Swal.fire({
        title: "Success Add Wishlist!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleAddWishlist}
      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
    >
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );
}