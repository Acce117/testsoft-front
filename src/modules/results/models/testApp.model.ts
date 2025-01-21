import { BaseModel } from "@/common/utils/BaseModel";

const url = "test_app";

const columns = [
  {
    field: "test.name",
    fieldGetter:(value:TestAplication)=>value.test.name,
    header: "test.name",
  },
  {
    field: "date",
    header: "test.date",
  },
];

export class TestAplication extends BaseModel {
  id_test_application;
  fk_id_user;
  fk_id_test;
  date;
  test;

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

  public getColumns() {
    return columns;
  }

  public getFieldAsID(): string {
    return "id_test_application";
  }
}
