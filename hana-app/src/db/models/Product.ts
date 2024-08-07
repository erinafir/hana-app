import { z } from "zod";
import db from "../config/mongodb";
import { ObjectId } from "mongodb";

const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  price: z.string(),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  images: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface ProductType {
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

export interface ProductId {
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
}

class Product {
  static collection() {
    return db.collection<ProductType>("products");
  }
  static async getAll(name: string | null, page: string | null) {
    let limit = 8;
    let currentPage = page || 1;

    if (name) {
      const products = await this.collection()
        .find({ name: { $regex: name || "", $options: "i" } })
        .toArray();
      return products;
    }
    if (page) {
      const products = await this.collection()
        .find()
        .skip((Number(currentPage) - 1) * limit)
        .limit(name ? 10 : limit)
        .toArray();
      return products;
    }
    if(!name && !page){
      const products = await this.collection()
        .find()
        .limit(limit)
        .toArray();
      return products;
    }
  }
  static async getById(id: string) {
    const product = await this.collection().findOne({
      _id: new ObjectId(String(id)),
    });
    if (!product) {
      let error = new Error("product not found");
      error.name = "NotFound";
      throw error;
    }
  }

  static async getBySlug(slug: string){
    const product = await this.collection().findOne({slug: slug})
    if (!product) {
      let error = new Error("product not found");
      error.name = "NotFound";
      throw error
    }
    return product
  }
}

export default Product;
