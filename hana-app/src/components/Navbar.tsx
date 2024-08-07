import Link from "next/link";
import { FiHeart, FiUser } from "react-icons/fi";
import ButtonLogout from "./ButtonLogout";

export default function Navbar({isLoggedIn}: {isLoggedIn: boolean}) {
  return (
    <>
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "black",
            height: 40,
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <p className="font-light">Hana 2024 Summer Collection: Out Now</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 110,
            alignItems: "center",
            padding: 50,
            backgroundColor: "white",
            color: "black",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", gap: 10, flex: 1 }}
          >
            <Link href='/' className="text-xl">Home</Link>
            <Link href='/products' className="text-xl">Products</Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <p className="text-lg">Hana</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              gap: 20,
              flex: 1,
            }}
          >
            {isLoggedIn ? <ButtonLogout /> : <Link href='/login'><FiUser size={25} /></Link>}
            
            <Link href='/wishlist'><FiHeart size={25} /></Link>
          </div>
        </div>
      </div>
    </>
  );
}
