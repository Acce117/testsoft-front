import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

export class CorrectAnswer extends BaseModel {
  @ID
  id_correct_answer: number | undefined;
  fk_id_answer: number | undefined;
  static readonly url: string = "correct_answer";
}
