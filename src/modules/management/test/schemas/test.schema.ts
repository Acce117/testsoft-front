import { boolean, number, object, string } from "yup";

export const schema = object({
  name: string().required(),
  description: string().required(),
  navigable: boolean().required(),
  completed: boolean().required(),
  language: string().required(),
  fk_id_type_test: number().required(),

  


});
