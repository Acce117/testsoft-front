import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./classification.schema";
import { sendRequest } from "@/common/utils/sendRequest";
import type { TestRange } from "../test_range/test_range.model";


export class Classification extends BaseModel {
  id_classification;
  name_classification;
  ranges:TestRange[] = [];
  fk_id_test;
  static readonly url: string = "classification";


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



   
  public getSchema() {
    return schema;
  }

  static readonly field_as_id: string =  "id_classification";
  
}
