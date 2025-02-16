import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./item.schema";
import type { Range } from "../range/range.model";
import { sendRequest } from "@/common/utils/sendRequest";


export class Item extends BaseModel {
  id_item;
  name;
  description;
  fk_category;
  priority;
  ranges: Range[] = [];
  static readonly url: string = "item";
  static readonly field_as_id: string =  "id_item";



 

   
  public getSchema() {
    return schema;
  }

  
  async create() {
      const clone = { ...this };
      delete clone.ranges;
      return await sendRequest({
        method: "POST",
        url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
        body: clone,
      });
    }
  
    async update() {
      const clone = { ...this };
      delete clone.ranges;
      return await sendRequest({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
        body: clone,
      });
    }
}
