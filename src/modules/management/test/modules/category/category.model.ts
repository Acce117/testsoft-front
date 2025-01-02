import { BaseModel } from "@/core/BaseModel";
import { schema } from "./category.schema";

const url = "category";

export class Category extends BaseModel {
  id_category;
  name;
  description;
  items = [];

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
    return "id_category";
  }
}
