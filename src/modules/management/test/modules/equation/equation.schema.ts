import {   object, string } from "yup";

export const schema = object({
    equation:string().required(),

  });