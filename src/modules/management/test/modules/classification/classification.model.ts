import { BaseModel } from "@/core/BaseModel";
import { schema } from "./classification.schema";
import { sendRequest } from "@/core/sendRequest";
import type { TestRange } from "../test_range/test_range.model";

const url = "classification";

export class Classification extends BaseModel {
  id_classification;
  name_classification;
  ranges:TestRange[] = [];
  fk_id_test;

  constructor(data: object = {}) {
    super(data);
    this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);

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



  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_classification";
  }
}
