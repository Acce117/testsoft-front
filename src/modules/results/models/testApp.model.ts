import { BaseModel } from "@/common/utils/BaseModel";


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
  static readonly url: string = "test_app";
  static readonly field_as_id: string =  "id_test_application";
  


  public getColumns() {
    return columns;
  }

 
}
