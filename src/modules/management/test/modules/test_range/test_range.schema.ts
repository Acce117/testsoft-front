import { number, object, string } from "yup";

export const schema = object({
  min_val: number().required(),
  max_val: number().required(),
  indicator: string().required(),
  description: string(),
});
