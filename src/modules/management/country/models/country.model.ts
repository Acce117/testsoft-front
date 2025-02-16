
import { BaseModel } from "@/common/utils/BaseModel";

const columns = [
  {
    field: "name",
    header: "country.name",
  },
  {
    field: "code",
    header: "country.code",
  },
];


export class Country extends BaseModel {
  country_id;
  code;
  name;
  static readonly url: string = "country";
  static readonly field_as_id: string =  "country_id";



  
  public getColumns() {
    return columns;
  }
  // public getSchema() {
  //   return schema;
  // }

  

  
}

 


