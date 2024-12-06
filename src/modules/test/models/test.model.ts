
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
]


export class Test extends BaseModel {
  id_test;
  name;
  description;
  time_duration;
  

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_test = data.id_test;
      this.name = data.name;
      this.description = data.description;
      this.time_duration = data.time_duration;
    }
  }

  public setData(data: any) {
    this.id_test = data.id_test;
    this.name = data.name;
    this.description = data.description;
    this.time_duration = data.time_duration;

  }

  public clearData() {
    this.id_test = undefined;
      this.name = undefined;
      this.description = undefined;
      this.time_duration = undefined;

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

  public async getAssignedTests(user_id:string){
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/user/${user_id}/tests`
    });
  }

  
}

 


