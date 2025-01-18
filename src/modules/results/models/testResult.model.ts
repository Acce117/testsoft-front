import { BaseModel } from "@/common/utils/BaseModel";

const url = "execute_test";

export class TestResult extends BaseModel {
  id_test_application;
  parameters;
  avoided;
  preferred;
  categories;

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
    return "id_test_application";
  }
}
