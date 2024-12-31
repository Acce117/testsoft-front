import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/serie.schema";
import type { Question } from "./question.model";

const url = "test_serie";

export class Serie extends BaseModel {
  id_serie;
  name;
  description;
  time_serie_duration;
  questions:Question[] = [];
  fk_id_test;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_serie = data.id_serie;
      this.name = data.name;
      this.description = data.description;
      this.time_serie_duration = data.time_serie_duration;
      this.questions = data.questions;
      this.fk_id_test = data.fk_id_test;
    }
  }

  public setData(data: any) {
    this.id_serie = data.id_serie;
    this.name = data.name;
    this.description = data.description;
    this.time_serie_duration = data.time_serie_duration;
    this.questions = data.questions;
    this.fk_id_test = data.fk_id_test;
  }

  public clearData() {
    this.id_serie = undefined;
    this.name = undefined;
    this.description = undefined;
    this.time_serie_duration = undefined;
    this.questions = [];
    this.fk_id_test = undefined;
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
