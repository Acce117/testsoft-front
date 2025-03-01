import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";


export class QuestionTopValue extends BaseModel {
  @ID
  id_top_value:number|undefined;
  fk_id_question:number|undefined;
  top_value:number|undefined;
  static readonly url: string = "question_value";
}
