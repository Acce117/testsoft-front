import { BaseModel } from "@/core/BaseModel";
import { schema } from "./test_range.schema";

const url = "test_range";

export class TestRange extends BaseModel {
  id_test_range;
  min_val;
  max_val;
  indicator;
  description;
  fk_id_classification;

  constructor(data: object = {}) {
    super(data);
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
    return "id_test_range";
  }
}
