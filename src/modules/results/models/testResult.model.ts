import { BaseModel } from "@/common/utils/BaseModel";


export class TestResult extends BaseModel {
  id_test_application;
  parameters;
  avoided;
  preferred;
  categories;
  static readonly url: string = "execute_test";
  static readonly field_as_id: string =  "id_test_application";
  
}
