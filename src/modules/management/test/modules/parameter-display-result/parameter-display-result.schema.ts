import {  boolean, number, object, string } from "yup";

export const schema = object({
    tops_values:boolean().required(),
    global_result:boolean().required(),
    all_element_value:boolean().required()
    //fk_id_type_question:number().required()
  });