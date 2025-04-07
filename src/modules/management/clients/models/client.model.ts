import { BaseModel } from "@/common/utils/BaseModel";
import { ID, LogicErase } from "@/common/utils/Decorators";
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
  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
  },
];

export class Client extends BaseModel {
  @ID
  id_user: number | undefined;
  email: string | undefined;
  @LogicErase
  enabled: boolean | number | undefined;
  username: string | undefined;
  static readonly url: string = "user";
  static readonly columns = columns;

  public async getAll(params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/client`,
      body: params,
    });
  }
}
