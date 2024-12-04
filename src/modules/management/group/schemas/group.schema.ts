import {  object, string } from "yup";

export const schema = object({
    name_group: string().required(),
    father_group: string().required(),  
  });