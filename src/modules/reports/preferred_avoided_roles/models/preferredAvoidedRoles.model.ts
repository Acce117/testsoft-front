import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";
import { sendRequest } from "@/common/utils/sendRequest";

export class PreferredAvoidedRoles extends BaseModel {
  @ID
  country_id;

  static readonly url: string = "reports";
  static readonly columns = [];

  public static async getPreferredAvoidedRolesInGroup(id: number, params = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/reports/preferred_avoided_roles/${id}`,
      body: params,
    });
  }
}
