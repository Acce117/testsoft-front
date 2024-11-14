
import { BaseModel } from "@/core/BaseModel";

const url = "psi_test";


export class AssignedTest extends BaseModel {
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
  public getID(): string {
    return this.id_test;
  }
  
  

  public getFieldAsID(): string {
    return "id_test";
  }

  
}

 


