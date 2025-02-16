import { BaseModel } from "@/common/utils/BaseModel";


export class QuestionTopValue extends BaseModel {
  id_top_value;
  fk_id_question;
  top_value;
  static readonly url: string = "question_value";
  static readonly field_as_id: string =  "id_top_value";
  
}
