import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./equation.schema";


export class Equation extends BaseModel {
  fk_id_test;
  equation;
  static readonly url: string = "equation";
  static readonly field_as_id: string =  "fk_id_test";
   
  public getSchema() {
    return schema;
  }

}
