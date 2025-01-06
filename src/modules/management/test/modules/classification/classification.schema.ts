import {  object, string } from "yup";

export const schema = object({
  name_classification: string().required(),
});
