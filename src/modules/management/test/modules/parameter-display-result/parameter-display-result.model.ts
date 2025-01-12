import { BaseModel } from "@/core/BaseModel";
import { schema } from "./parameter-display-result.schema";

const url = "parameter_display_result";

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

  constructor(data: object = {}) {
    super(data);
    console.log(data)
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_parameter_display";
  }
}
