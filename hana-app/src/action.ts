"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const goToLogin = async () => {
    redirect("/login");
}

export const goToHome = async () => {
    revalidatePath("/");
    redirect("/");
}

export const clearCookie = async () => {
    cookies().delete("Authorization");
}

