import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";
import { schema } from "@/modules/management/test/schemas/test.schema";
import type { Serie } from "../modules/serie/serie.model";
import { ParameterDisplayResult } from "../modules/parameter-display-result/parameter-display-result.model";
import type { Category } from "../modules/category/category.model";
import { Equation } from "../modules/equation/equation.model";
import type { Classification } from "../modules/classification/classification.model";
import { ID, NotSavable } from "@/common/utils/Decorators";
import type { TestType } from "../modules/test-type/test-type.model";
import { columns } from "./test.columns";

export class Test extends BaseModel {
  @ID
  @NotSavable
  id_test: number | undefined;
  name: string | undefined;
  description: string | undefined;
  time_duration: number | undefined;
  recurring_time: number | undefined;
  completed: boolean | undefined;
  navigable: boolean | undefined;
  done: boolean | number | undefined;
  language: string | undefined;
  fk_id_type_test: number | undefined;
  @NotSavable
  type_psi_test: TestType | undefined;
  @NotSavable
  series: Serie[] = [];
  @NotSavable
  category: Category[] = [];
  @NotSavable
  classifications: Classification[] = [];
  @NotSavable
  display_parameters: ParameterDisplayResult | undefined;
  @NotSavable
  equation: Equation | undefined;
  static readonly url: string = "psi_test";
  static readonly columns = columns;
  static readonly schema = schema;

  constructor(data: any = null) {
    super(data);
    if (data) this.setData(data);

    // } else {
    //   this.equation = new Equation();
    //   this.display_parameters = new ParameterDisplayResult({
    //     count_max: 0,
    //     count_min: 0,
    //   });
    // }
  }

  public setData(data: any) {
    super.setData(data);
    this.navigable = data.navigable == 1;
    this.completed = data.completed == 1;
    this.done = data.done == 1;
    this.display_parameters = data.display_parameters
      ? new ParameterDisplayResult(data.display_parameters)
      : new ParameterDisplayResult();
    this.equation = data.equation
      ? new Equation(data.equation)
      : new Equation();
  }

  public async getAssignedTests(user_id: string) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/user/${user_id}/tests`,
    });
  }
  public isPsicometricTest() {
    return this.fk_id_type_test == 1 || this.type_psi_test?.id_type_test == 1;
  }
  public isPsicometricTestWithEquation() {
    return (
      this.isPsicometricTest() &&
      this.equation?.equation &&
      this.equation.equation?.trim() != ""
    );
  }
  public isPersonalityTest() {
    return this.type_psi_test?.id_type_test == 2 || this.fk_id_type_test == 2;
  }
}
