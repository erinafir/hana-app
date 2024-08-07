"use client";

import { clearCookie } from "@/action";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function ButtonLogout() {
    const router = useRouter()
  const handleLogout = () => {
    clearCookie()
    router.push("/");
  };

  return (
    <button onClick={handleLogout}>
      <FiLogOut size={25} />
    </button>
  );
}
