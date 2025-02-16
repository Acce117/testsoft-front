import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./category.schema";
import type { Item } from "../item/item.model";
import { sendRequest } from "@/common/utils/sendRequest";


export class Category extends BaseModel {
  id_category;
  name;
  description;
  items: Item[] = [];
  static readonly url: string = "category";
  static readonly field_as_id: string =  "id_category";



  public getSchema() {
    return schema;
  }
  async create() {
      const clone = { ...this };
      delete clone.items;
  
      return await sendRequest({
        method: "POST",
        url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
        body: clone,
      });
    }
  
    async update() {
      const clone = { ...this };
      delete clone.items;

  
      return await sendRequest({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
        body: clone,
      });
    }

}
