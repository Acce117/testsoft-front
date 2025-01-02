import { BaseModel } from "@/core/BaseModel";
import { sendRequest } from "@/core/sendRequest";
import { schema } from "@/modules/management/test/schemas/test.schema";
import type { Serie } from "../modules/serie/serie.model";
import { ParameterDisplayResult } from "../modules/parameter-display-result/parameter-display-result.model";

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
  series: Serie[];
  display_parameters;

  constructor(data: any = null) {
    super(data);
    if (data) {
      this.setData(data);
    } else {
      this.series = [];
      this.display_parameters = new ParameterDisplayResult({
        count_max: 0,
        count_min: 0,
      });
    }
  }

  public setData(data: any) {
    super.setData(data, this);
    this.display_parameters = data.display_parameters
      ? new ParameterDisplayResult(data.display_parameters)
      : new ParameterDisplayResult();
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
