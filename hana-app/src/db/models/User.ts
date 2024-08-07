import { z } from "zod";
import db from "../config/mongodb";
import { hashPassword } from "../helper/bcrypt";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export type UserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

class User {
  static collection() {
    return db.collection<UserType>("users");
  }
  static async getAll() {
    const users = await this.collection().find().toArray();
    return users;
  }
  static async getUserByEmail(email: string) {
    return await this.collection().findOne({ email });
  }
  static async getUserByUsername(username: string) {
    return await this.collection().findOne({ username });
  }
  static async create(payload: UserType) {
    const parsedData = UserSchema.safeParse(payload);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    payload.password = hashPassword(payload.password);
    await this.collection().insertOne(payload);
    return "success register"
  }
}

export default User;
