import { BaseModel } from "@/core/BaseModel";
import { schema } from "./range.schema";

const url = "range";

export class Range extends BaseModel {
  id_range;
  min_value;
  max_value;
  indicator;
  description;
  fk_id_item;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data, this);
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
