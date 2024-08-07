import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash
};

export const comparePassword = (password: string, dataPassword: string) => {
  const compare = bcrypt.compareSync(password, dataPassword)
  return compare
}