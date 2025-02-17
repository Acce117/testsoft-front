import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

export class TestResult extends BaseModel {
  @ID
  id_test_application;
  parameters;
  avoided;
  preferred;
  categories;
  static readonly url: string = "execute_test";
}
