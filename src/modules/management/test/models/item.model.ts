import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/item.schema";

const url = "item";

export class Item extends BaseModel {
  id_item;
  name;
  description;
  fk_category;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_item = data.id_item;
      this.name = data.name;
      this.description = data.description;
      this.fk_category = data.fk_category;
    }
  }

  public setData(data: any) {
    this.id_item = data.id_item;
    this.name = data.name;
    this.description = data.description;
    this.fk_category = data.fk_category;

  }

  public clearData() {
    this.id_item = undefined;
    this.name = undefined;
    this.description = undefined;
    this.fk_category = undefined;

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
