import { object, string } from "yup";

export const schema = object({
    email: string().required().email(),
    name: string().required(),
    username: string().required().min(8),
    last_name: string().required()

  });