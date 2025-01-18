import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./range.schema";

const url = "range";

export class Range extends BaseModel {
  id_range;
  min_val;
  max_val;
  indicator;
  description;
  fk_id_item;

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
    return "id_range";
  }
}
