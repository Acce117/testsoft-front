import {   object, string } from "yup";

export const schema = object({
    name:string().required(),
    description:string().required()
  });