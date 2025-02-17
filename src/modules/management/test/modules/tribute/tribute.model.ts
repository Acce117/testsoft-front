import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

export class Tribute extends BaseModel {
  @ID
  fk_id_answer: number | undefined;
  fk_id_item: number | undefined;
  tribute_value: number | undefined;
  static readonly url: string = "tribute";
}
