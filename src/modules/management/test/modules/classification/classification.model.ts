import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./classification.schema";
import type { TestRange } from "../test_range/test_range.model";
import { ID, NotSavable } from "@/common/utils/Decorators";

export class Classification extends BaseModel {
  @ID
  id_classification: number | undefined;
  name_classification: string | undefined;
  @NotSavable
  ranges: TestRange[] = [];
  fk_id_test: number | undefined;
  static readonly url: string = "classification";
  static readonly schema = schema;
}
