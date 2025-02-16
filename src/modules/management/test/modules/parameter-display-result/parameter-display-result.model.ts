import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./parameter-display-result.schema";


export class ParameterDisplayResult extends BaseModel {
  id_parameter_display;
  statement;
  global_result;
  fk_id_test;
  all_element_value;
  element_by_category;
  tops_values;
  count_max;
  count_min;
  static readonly url: string = "parameter_display_result";
  static readonly field_as_id: string =  "id_parameter_display";
   
  public getSchema() {
    return schema;
  }

}
