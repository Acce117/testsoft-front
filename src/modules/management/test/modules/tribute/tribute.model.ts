import { BaseModel } from "@/common/utils/BaseModel";

export class Tribute extends BaseModel {
  fk_id_item;
  fk_id_answer;
  tribute_value;
  static readonly url: string = "tribute";
  static readonly field_as_id: string =  "fk_id_answer";
  
}
