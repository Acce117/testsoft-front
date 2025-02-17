
import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

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
  @ID
  country_id;
  code;
  name;
  static readonly url: string = "country";
  static readonly columns = columns;
  
}

 


