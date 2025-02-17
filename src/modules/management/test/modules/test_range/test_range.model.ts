import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./test_range.schema";
import { ID } from "@/common/utils/Decorators";


export class TestRange extends BaseModel {
  @ID
  id_test_range:number|undefined;
  min_val:number|undefined;
  max_val:number|undefined;
  indicator:string|undefined;
  description:string|undefined;
  fk_id_classification:number|undefined;
  static readonly url: string = "test_range";
  static readonly schema = schema;
 
}
