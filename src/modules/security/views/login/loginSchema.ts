import { object, string } from "yup";

export const loginSchema = object({
    username: string().required(),
    password: string().required(),  
  });