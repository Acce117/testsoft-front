import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";

export class GroupForTest extends BaseModel {
  id_group_for_test;
  fk_id_test;
  fk_id_group;
  static readonly url: string = "group_for_test";
  static readonly field_as_id: string = "fk_id_group";

  async create(body: object) {
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/psi_test/assign_test_to_group`,
      body: body,
    });
  }
}
