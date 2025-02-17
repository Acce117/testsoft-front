import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./equation.schema";
import { ID } from "@/common/utils/Decorators";


export class Equation extends BaseModel {
  @ID
  fk_id_test:number|undefined;
  equation:string|undefined;
  static readonly url: string = "equation";
  static readonly schema = schema;

}
