import { BaseModel } from "@/core/BaseModel";
import { schema } from "./serie.schema";
import type { Question } from "./question.model";

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
    return "id_serie";
  }
}
