import { ObjectId } from "mongodb";
import { z } from "zod";
import db from "../config/mongodb";

const WishlistSchema = z.object({
    productId: z.instanceof(ObjectId),
    userId: z.instanceof(ObjectId),
    createdAt: z.date(),
    updatedAt: z.date()
})

interface WishlistType {
    productId: ObjectId
    userId: ObjectId
    createdAt?: Date
    updatedAt?: Date
}

class Wishlist {
    static collection(){
        return db.collection<WishlistType>("wishlist")
    }
    static async addWishlist(payload: WishlistType){
        const parsedData = WishlistSchema.safeParse(payload)
        if (!parsedData.success) {
            throw parsedData.error
        }
        await this.collection().insertOne(payload)
        return "Success add wishlist"
    }
    static async getWishlistByUserId(userId: string){
        const agg = [
            {
              '$match': {
                'userId': new ObjectId(userId)
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': 'productId', 
                'foreignField': '_id', 
                'as': 'productData'
              }
            }, {
              '$unwind': {
                'path': '$productData'
              }
            }
          ]
        const wishlist = await this.collection().aggregate(agg).toArray()
        return wishlist
    }
    static async searchWishlist(productId: string){
        const wishlist = await this.collection().findOne({productId: new ObjectId(productId)})
        return wishlist
    }
    static async deleteWishlist(_id:string){
        const deleteWish = await this.collection().deleteOne({_id: new ObjectId(String(_id))}) 
        // console.log(deleteWish, 'deletewish');
        return "Success delete wish"
    }
}

export default Wishlist