import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/category.schema";

const url = "category";

export class Category extends BaseModel {
  id_category;
  name;
  description;
  items = [];

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_category = data.id_category;
      this.name = data.name;
      this.description = data.description;
      this.items = data.items;
    }
  }

  public setData(data: any) {
    this.id_category = data.id_category;
    this.name = data.name;
    this.description = data.description;
    this.items = data.items;

  }

  public clearData() {
    this.id_category = undefined;
    this.name = undefined;
    this.description = undefined;
    this.items = [];

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
