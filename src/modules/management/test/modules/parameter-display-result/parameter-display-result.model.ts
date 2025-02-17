import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./parameter-display-result.schema";
import { ID } from "@/common/utils/Decorators";

export class ParameterDisplayResult extends BaseModel {
  @ID
  id_parameter_display: number | undefined;
  statement: string | undefined;
  global_result: number | boolean | undefined;
  fk_id_test: number | undefined;
  all_element_value: number | boolean | undefined;
  element_by_category: number | boolean | undefined;
  tops_values: number | boolean | undefined;
  count_max: number | undefined;
  count_min: number | undefined;
  static readonly url: string = "parameter_display_result";
  static readonly schema = schema;
}
