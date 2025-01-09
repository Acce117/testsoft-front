import { BaseModel } from "@/core/BaseModel";
import { schema } from "./category.schema";
import type { Item } from "../item/item.model";

const url = "category";

export class Category extends BaseModel {
  id_category;
  name;
  description;
  items: Item[] = [];

  constructor(data: object = {} ) {
    super(data);
    if (data) 
      this.setData(data);
    

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
    return "id_category";
  }
}
