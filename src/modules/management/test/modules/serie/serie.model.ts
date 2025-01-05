import { BaseModel } from "@/core/BaseModel";
import { schema } from "./serie.schema";
import type { Question } from "./question.model";
import { sendRequest } from "@/core/sendRequest";

const url = "test_serie";

export class Serie extends BaseModel {
  id_serie;
  name;
  description;
  time_serie_duration;
  questions:Question[] = [];
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
      delete clone.questions;
      return await sendRequest({
        method: "POST",
        url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
        body: clone,
      });
    }
  
    async update() {
      const clone = { ...this };
      delete clone.questions;
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
    return "id_serie";
  }
}
