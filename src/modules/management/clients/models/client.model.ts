import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";

const columns = [
  {
    field: "username",
    header: "user.username",
  },
  {
    field: "email",
    header: "user.email",
  },

  {
    field: "enabled",
    header: "global.enabled",
    isBoolean: true,
  },
];

export class Client extends BaseModel {
  id_user;
  email;
  enabled;
  username;
  static readonly url: string = "user";
  static readonly field_as_id: string =  "id_user";


  public getColumns() {
    return columns;
  }

  
  public getFieldAsActive(): string {
    return "enabled";
  }

  public async getAll(params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/client`,
      body: params,
    });
  }
}
