import { BaseModel } from "@/core/BaseModel";
import { sendRequest } from "@/core/sendRequest";
import { schema } from "@/modules/management/test/schemas/test.schema";
import type { Serie } from "./serie.model";
import { ParameterDisplayResult } from "./parameter-display-result.model";

const url = "psi_test";
const columns = [
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "time_duration",
    header: "Tiempo de Duración (min)",
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
  series:Serie[] ;
  display_parameters;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_test = data.id_test;
      this.name = data.name;
      this.description = data.description;
      this.time_duration = data.time_duration;
      this.completed = data.completed;
      this.done = data.done;
      this.language = data.language;
      this.navigable = data.navigable;
      this.recurring_time = data.recurring_time;
      this.fk_id_type_test = data.fk_id_type_test;
      this.type_psi_test = data.type_psi_test;
      this.series = data.series;
      this.display_parameters = data.display_parameters? new ParameterDisplayResult(data.display_parameters):new ParameterDisplayResult();
    }else {
      this.series = []
      this.display_parameters = new ParameterDisplayResult({count_max:0,count_min:0});

    }
    console.log(this.display_parameters)
  }

  public setData(data: any) {
    this.id_test = data.id_test;
    this.name = data.name;
    this.description = data.description;
    this.time_duration = data.time_duration;
    this.done = data.done;
    this.language = data.language;
    this.completed = data.completed;
    this.navigable = data.navigable;
    this.recurring_time = data.recurring_time;
    this.series = data.series;
    this.fk_id_type_test = data.fk_id_type_test;
    this.type_psi_test = data.type_psi_test;
    this.display_parameters = data.display_parameters? new ParameterDisplayResult(data.display_parameters):new ParameterDisplayResult();

  }

  public clearData() {
    this.id_test = undefined;
    this.name = undefined;
    this.description = undefined;
    this.time_duration = undefined;
    this.completed = undefined;
    this.navigable = undefined;
    this.recurring_time = undefined;
    this.done = undefined;
    this.language = undefined;
    this.series = [];
    this.fk_id_type_test = undefined;
    this.type_psi_test = undefined;
    this.display_parameters = undefined;

  }

  public getURL(): string {
    return url;
  }

  public getColumns() {
    return columns;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_test";
  }
  async update() {
    const clone = { ...this };
    delete clone.series;

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
      url: `${import.meta.env.VITE_API_PATH}/user/${user_id}/tests`,
    });
  }
}
