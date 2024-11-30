
import { BaseModel } from "@/core/BaseModel";

const url = "country";
const columns = [
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "code",
    header: "Código",
  },
];


export class Country extends BaseModel {
  country_id;
  code;
  name;

  constructor(data: any = null) {
    super();

    if (data) {
      this.country_id = data.country_id;
      this.name = data.name;
      this.code = data.code;

    }
  }

  public setData(data: any) {
    this.country_id = data.country_id;
    this.name = data.name;
    this.code = data.code;

  }

  public clearData() {
    this.name = undefined;
    this.code = undefined;

    this.country_id = undefined;

  }

  public getURL(): string {
    return url;
  }
  
  public getColumns() {
    return columns;
  }
  // public getSchema() {
  //   return schema;
  // }

  public getFieldAsID(): string {
    return "country_id";
  }

  
}

 


