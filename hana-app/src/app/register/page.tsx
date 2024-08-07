"use client";
import { goToLogin } from "@/action";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!input.email || !input.username || !input.password) {
        return Swal.fire({
          title: "Oops...",
          text: "Please fill in all fields",
          icon: "error",
        });
      }
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/register", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      Swal.fire({
        title: "Success Register!",
        icon: "success",
        text: "Login with your new account",
      });
      goToLogin();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">
            Register for a new account
          </span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-black rounded-t-md" />
            <div className="px-8 py-6 ">
              <form onSubmit={handleSubmit}>
                <label className="block font-semibold">Email</label>
                <input
                  value={input.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
                <label className="block font-semibold">Username</label>
                <input
                  value={input.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
                <label className="block font-semibold">Full Name</label>
                <input
                  value={input.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
                <label className="block mt-3 font-semibold">Password</label>
                <input
                  value={input.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
                <div className="flex items-baseline">
                  <button className="mt-4 bg-black text-white py-2 px-6 rounded-md hover:bg-purple-600 ">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="flex items-baseline gap-1 my-2">
                <p className="text-sm">Already have an account?</p>
                <Link href="/login" className="text-sm hover:underline ">
                  Sign In Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
