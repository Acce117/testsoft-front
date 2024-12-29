import {   object, string } from "yup";

export const schema = object({
    indicator:string().required(),
    description:string().required()
  });