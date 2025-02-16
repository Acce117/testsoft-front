import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./serie.schema";
import type { Question } from "./question.model";
import { sendRequest } from "@/common/utils/sendRequest";

export class Serie extends BaseModel {
  id_serie;
  name;
  description;
  time_serie_duration = 0;
  questions: Question[] = [];
  fk_id_test;
  static readonly url: string = "test_serie";
  static readonly field_as_id: string =  "id_serie";
  

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

  public getSchema() {
    return schema;
  }

  
}
