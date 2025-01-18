import { BaseModel } from "@/common/utils/BaseModel";

const url = "tribute";

export class Tribute extends BaseModel {
  fk_id_item;
  fk_id_answer;
  tribute_value;

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

  public getFieldAsID(): string {
    return "fk_id_answer";
  }
}
