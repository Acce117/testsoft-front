import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";


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
  @ID
  id_test_application:number|undefined;
  fk_id_user:number|undefined;
  fk_id_test:number|undefined;
  date;
  test;
  static readonly url: string = "test_app";
  static readonly columns = columns;

}
