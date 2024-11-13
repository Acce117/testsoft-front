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
  },
  {
    field: "user_type",
    header: "Tipo de Usuario",
  },
  {
    field: "country_id",
    header: "País",
  },
  
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

  constructor(data: any = null) {
    super();

    if (data) {
      this.user_id = data.user_id;
      this.name = data.name;
      this.CI = data.CI;
      this.password = data.password;

      this.username = data.username;
      this.last_name = data.last_name;
      this.email = data.email;
      this.sex = data.sex;
      this.user_type = data.user_type;
      this.country_id = data.country_id;

    }
  }

  public setData(data: any) {
    this.user_id = data.user_id;
    this.CI = data.CI;
    this.name = data.name;
    this.password = data.password;
    this.username = data.username;
    this.last_name = data.last_name;
    this.email = data.email;
    this.sex = data.sex;
    this.user_type = data.user_type;
    this.country_id = data.country_id;

  }

  public clearData() {
    this.user_id = undefined;
    this.CI = undefined;
    this.name = undefined;
    this.password = undefined;
    this.username = undefined;
    this.last_name = undefined;
    this.email = undefined;
    this.sex = undefined;
    this.user_type = undefined;
    this.country_id = undefined;

  }

  public getURL(): string {
    return url;
  }
  public getID(): string {
    return this.user_id;
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

 


