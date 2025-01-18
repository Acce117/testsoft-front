import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./item.schema";
import type { Range } from "../range/range.model";
import { sendRequest } from "@/common/utils/sendRequest";

const url = "item";

export class Item extends BaseModel {
  id_item;
  name;
  description;
  fk_category;
  priority;
  ranges: Range[] = [];


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
    return "id_item";
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
