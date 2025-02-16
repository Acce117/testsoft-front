import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";
import { schema } from "@/modules/management/test/schemas/test.schema";
import type { Serie } from "../modules/serie/serie.model";
import { ParameterDisplayResult } from "../modules/parameter-display-result/parameter-display-result.model";
import type { Category } from "../modules/category/category.model";
import { Equation } from "../modules/equation/equation.model";
import type { Classification } from "../modules/classification/classification.model";

const columns = [
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "time_duration",
    header: "Tiempo de Duración (min)",
  },
  {
    field: "navigable",
    header: "¿Es posible navegar por las diferentes series del test?",
    isBoolean: true,
  },
  {
    field: "completed",
    header:
      "¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?",
    isBoolean: true,
  },
  {
    field: "type_psi_test.type_test_name",
    fieldGetter: (value: Test) => value.type_psi_test.type_test_name,
    header: "Tipo de Test",
  },
  {
    field: "type_psi_test.done",
    fieldGetter: (value: Test) => value.done==1?'Cerrado':'Abierto',
    header: "Estado",
  },
];

export class Test extends BaseModel {
  id_test;
  name;
  description;
  time_duration;
  recurring_time;
  completed;
  navigable;
  done;
  language;
  fk_id_type_test;
  type_psi_test;
  series: Serie[] =[];
  category: Category[] =[];
  classifications: Classification[] =[];
  display_parameters;
  equation;
  static readonly url: string = "psi_test";
  static readonly field_as_id: string =  "id_test";

  constructor(data: any = null) {
    super(data);
    if (data) 
      this.setData(data);
    
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
    this.navigable = data.navigable == 1
    this.completed = data.completed == 1
    this.done = data.done == 1
    this.display_parameters = data.display_parameters
      ? new ParameterDisplayResult(data.display_parameters)
      : new ParameterDisplayResult();
    this.equation = data.equation
      ? new Equation(data.equation)
      : new Equation();
  }

  public getColumns() {
    return columns;
  }
  public getSchema() {
    return schema;
  }



  async create() {
    const clone = { ...this };
    delete clone.equation;
    delete clone.display_parameters;
    delete clone.series;
    delete clone.category;
    delete clone.classifications

    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: clone,
    });
  }

  async update() {
    const clone = { ...this };
    delete clone.id_test;

    delete clone.series;
    delete clone.category;
    delete clone.classifications
    delete clone.equation;
    delete clone.type_psi_test;
    delete clone.display_parameters;

    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: clone,
    });
  }

  public async getAssignedTests(user_id: string) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/user/${user_id}/tests`
    });
  }
  public isPsicometricTest(){
    return this.fk_id_type_test ==1 || this.type_psi_test?.id_type_test==1 
  }
  public isPsicometricTestWithEquation(){
    return this.isPsicometricTest() && this.equation.equation && this.equation.equation.trim()!=''
  }
  public isPersonalityTest(){
    return this.type_psi_test?.id_type_test==2||this.fk_id_type_test ==2
  }
}
