import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";

const url = "group_for_test";

export class GroupForTest extends BaseModel {
  id_group_for_test;
  fk_id_test;
  fk_id_group;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
  }
  async create(body) {
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/psi_test/assign_test_to_group`,
      body: body,
    });
  }
  public getURL(): string {
    return url;
  }

  public getFieldAsID(): string {
    return "fk_id_group";
  }
}
