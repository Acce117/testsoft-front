import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/parameter-display-result.schema";

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

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_parameter_display = data.id_parameter_display;
      this.statement = data.statement;
      this.fk_id_test = data.fk_id_test;
      this.global_result = data.global_result;

      this.all_element_value = data.all_element_value;
      this.element_by_category = data.element_by_category;

      this.tops_values = data.tops_values;
      this.count_min = data.count_min;
      this.count_max = data.count_max;
    }
  }

  public setData(data: any) {
    this.id_parameter_display = data.id_parameter_display;
    this.statement = data.statement;
    this.fk_id_test = data.fk_id_test;
    this.all_element_value = data.all_element_value;
    this.global_result = data.global_result;
    this.element_by_category = data.element_by_category;
    this.tops_values = data.tops_values;
    this.count_min = data.count_min;
    this.count_max = data.count_max;
  }

  public clearData() {
    this.id_parameter_display = undefined;
    this.statement = undefined;
    this.fk_id_test = undefined;
    this.all_element_value = undefined;
    this.global_result = undefined;
    this.element_by_category = undefined;
    this.tops_values = undefined;
    this.count_min = undefined;
    this.count_max = undefined;
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
