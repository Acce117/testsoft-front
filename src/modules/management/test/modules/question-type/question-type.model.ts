import { BaseModel } from "@/common/utils/BaseModel";


export class QuestionType extends BaseModel {
  id_type_question;
  name;
  static readonly url: string = "type_question";
  static readonly field_as_id: string =  "id_type_question";
  
}
