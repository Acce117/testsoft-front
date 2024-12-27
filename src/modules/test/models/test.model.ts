import { BaseModel } from "@/core/BaseModel";
import { sendRequest } from "@/core/sendRequest";
import { schema } from "@/modules/management/test/schemas/test.schema";

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
  series=[];

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

      this.series = data.series;

    }
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

  public async getAssignedTests(user_id: string) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/user/${user_id}/tests`,
    });
  }
}
