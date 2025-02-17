import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./range.schema";
import { ID } from "@/common/utils/Decorators";

export class Range extends BaseModel {
  @ID
  id_range: number | undefined;
  min_val: number | undefined;
  max_val: number | undefined;
  indicator: string | undefined;
  description: string | undefined;
  fk_id_item: number | undefined;
  static readonly url: string = "range";
  static readonly schema = schema;
}
