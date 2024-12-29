import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/range.schema";

const url = "range";

export class Range extends BaseModel {
  id_range;
  min_value;
  max_value;
  indicator;
  description;
  fk_id_item;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_range = data.id_range;
      this.min_value = data.min_value;
      this.max_value = data.max_value;
      this.indicator = data.indicator;
      this.description = data.description;
      this.fk_id_item = data.fk_id_item;
    }
  }

  public setData(data: any) {
    this.id_range = data.id_range;
    this.min_value = data.min_value;
    this.max_value = data.max_value;
    this.indicator = data.indicator;
    this.description = data.description;
    this.fk_id_item = data.fk_id_item;

  }

  public clearData() {
    this.id_range = undefined;
    this.min_value = undefined;
    this.description = undefined;
    this.fk_id_item = undefined;
    this.max_value = undefined;
    this.indicator = undefined;

  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_range";
  }
}
