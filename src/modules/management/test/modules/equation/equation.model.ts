import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./equation.schema";

const url = "equation";

export class Equation extends BaseModel {
  fk_id_test;
  equation;

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
    return "fk_id_test";
  }
}
