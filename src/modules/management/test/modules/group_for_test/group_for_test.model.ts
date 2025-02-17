import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";
import { sendRequest } from "@/common/utils/sendRequest";

export class GroupForTest extends BaseModel {
  @ID
  id_group_for_test:number|undefined;
  fk_id_test:number|undefined;
  fk_id_group:number|undefined;
  static readonly url: string = "group_for_test";

  async create(body: object) {
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/psi_test/assign_test_to_group`,
      body: body,
    });
  }
}
