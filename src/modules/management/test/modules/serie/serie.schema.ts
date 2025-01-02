import {  number, object, string } from "yup";

export const schema = object({
    name:string().required(),
    description:string().required(),
    time_serie_duration:number().min(0)
  });