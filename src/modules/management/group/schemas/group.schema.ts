import {  number, object, string } from "yup";

export const schema = object({
    name_group: string().required(),
    father_group: number().required(),  
  });

  export const updateSchema = object({
    name_group: string().required(),
  });