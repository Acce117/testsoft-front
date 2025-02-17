import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

  
export class TestType extends BaseModel {
  @ID
  id_type_test:number|undefined;
  type_test_name:string|undefined;
  description:string|undefined;
  static readonly url: string = "type_psi_test";
}
