import {  number, object, string } from "yup";

export const schema = object({
    statement:string().required(),
    fk_id_type_question:number().required()
  });