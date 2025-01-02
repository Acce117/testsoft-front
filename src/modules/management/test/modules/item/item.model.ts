import { BaseModel } from "@/core/BaseModel";
import { schema } from "./item.schema";

const url = "item";

export class Item extends BaseModel {
  id_item;
  name;
  description;
  fk_category;

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
    return "id_item";
  }
}
