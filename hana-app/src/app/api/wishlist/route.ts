import Wishlist from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const userId:string = request.headers.get("x-id") as string;
  const wishlist = await Wishlist.getWishlistByUserId(userId);
  return NextResponse.json(wishlist);
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-id") as string;
    // console.log(userId, 'userid');
    const body: { productId: string } = await request.json();
    // console.log(body, 'productid');
    const checkWishlist = await Wishlist.searchWishlist(body.productId);
    // console.log(checkWishlist, 'checkwishlist');
    if (checkWishlist) {
      return NextResponse.json(
        {
          message: "You have added this product before",
        },
        { status: 400 }
      );
    }
    const wishlist = await Wishlist.addWishlist({
      productId: new ObjectId(String(body)),
      userId: new ObjectId(String(userId)),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json(wishlist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((el) => el.path[0] + " " + el.message) },
        { status: 400 }
      );
    }
  }
}

export async function DELETE(request: Request) {
  try {
    const { _id }: { _id: string } = await request.json();
    // console.log(_id, 'method');
    
    const wishlist = await Wishlist.deleteWishlist(_id);
    // console.log(wishlist, 'method');
    
    return NextResponse.json(wishlist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((el) => el.path[0] + " " + el.message) },
        { status: 400 }
      );
    }
  }
}
