import { BaseModel } from "@/core/BaseModel";

const url = "type_psi_test";

export class TestType extends BaseModel {
  id_type_test;
  type_test_name;
  description;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data, this);
  }

  public getURL(): string {
    return url;
  }

  public getFieldAsID(): string {
    return "id_type_test";
  }
}
