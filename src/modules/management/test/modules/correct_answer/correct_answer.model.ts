import { BaseModel } from "@/common/utils/BaseModel";


export class CorrectAnswer extends BaseModel {
  id_correct_answer;
  fk_id_answer;
  static readonly url: string = "correct_answer";
  static readonly field_as_id: string =  "id_correct_answer";
  
}
