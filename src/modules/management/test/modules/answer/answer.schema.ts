import {   number, object, string } from "yup";

export const schema = object({
    text:string().required(),
    fk_id_item:number().required()
  });