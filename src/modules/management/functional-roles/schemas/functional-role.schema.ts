import { number, object, string } from "yup";

const schema = object({
  rol_name: string().required(),
  rol_descrip: string().required(),
  id_group: number().integer().required(),
});
export default schema;
