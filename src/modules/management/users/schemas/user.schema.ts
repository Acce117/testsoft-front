import { number, object, string } from "yup";

export const schema = object({
    CI:string().length(11).required(),
    email: string().required().email(),
    name: string().required(),
    sex: string().required(),
    username: string().required().min(8),
    password: string().required().min(8),
    last_name: string().required(),
    country_id: number().integer().required(),
    group_id: number().integer().required(),
    item_id: number().integer().required(),

  });