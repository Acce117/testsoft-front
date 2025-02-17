import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";


export class QuestionType extends BaseModel {
  @ID
  id_type_question:number|undefined;
  name:string|undefined;
  static readonly url: string = "type_question";  
}
