import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./range.schema";


export class Range extends BaseModel {
  id_range;
  min_val;
  max_val;
  indicator;
  description;
  fk_id_item;
  static readonly url: string = "range";
  static readonly field_as_id: string =  "id_range";



  public getSchema() {
    return schema;
  }

  
}
