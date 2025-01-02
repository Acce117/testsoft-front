
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

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
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

 


