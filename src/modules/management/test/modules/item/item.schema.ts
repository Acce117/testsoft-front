import { number, object, string } from "yup";

export const schema = object({
  name: string().required(),
  description: string().required(),
  priority: number().min(0).required(),
});
