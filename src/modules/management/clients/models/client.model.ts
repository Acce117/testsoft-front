import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";

const url = "user";
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

  


  public getFieldAsID(): string {
    return "user_id";
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
