import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/serie.schema";

const url = "serie";

export class Serie extends BaseModel {
  id_serie;
  name;
  description;
  time_serie_duration;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_serie = data.id_serie;
      this.name = data.name;
      this.description = data.description;
      this.time_serie_duration = data.time_serie_duration;
    }
  }

  public setData(data: any) {
    this.id_serie = data.id_serie;
    this.name = data.name;
    this.description = data.description;
    this.time_serie_duration = data.time_serie_duration;
  }

  public clearData() {
    this.id_serie = undefined;
    this.name = undefined;
    this.description = undefined;
    this.time_serie_duration = undefined;
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
