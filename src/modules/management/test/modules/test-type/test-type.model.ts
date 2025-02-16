import { BaseModel } from "@/common/utils/BaseModel";

  
export class TestType extends BaseModel {
  id_type_test;
  type_test_name;
  description;
  static readonly url: string = "type_psi_test";
  static readonly field_as_id: string =  "id_type_test";
}
