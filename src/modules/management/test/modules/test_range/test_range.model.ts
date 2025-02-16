import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./test_range.schema";


export class TestRange extends BaseModel {
  id_test_range;
  min_val;
  max_val;
  indicator;
  description;
  fk_id_classification;
  static readonly url: string = "test_range";
  static readonly field_as_id: string =  "id_test_range";

  public getSchema() {
    return schema;
  }

  
}
