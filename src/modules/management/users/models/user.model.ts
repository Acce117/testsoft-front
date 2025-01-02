import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";
import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/user.schema";

const url = "user";
const columns = [
  {
    field: "CI",
    header: "Carnet de Identidad",
  },
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "last_name",
    header: "Apellido",
  },
  {
    field: "username",
    header: "Nombre de Usuario",
  },
  {
    field: "email",
    header: "Email",
  },
  {
    field: "sex",
    header: "Sexo",
  }
  
];


export class User extends BaseModel {
  user_id;
  CI;
  name;
  username;
  password;
  last_name;
  email;
  sex;
  user_type;
  country_id;
  country;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data, this);
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
    return "user_id";
  }

  
}

 


