import { renameTreeForTreeTable } from "@/common/utils/renameTree";
import { BaseModel } from "@/common/utils/BaseModel";
import { schema, updateSchema } from "../schemas/group.schema";
import { sendRequest } from "@/common/utils/sendRequest";
import { ID, NotSavable } from "@/common/utils/Decorators";
import { userStore } from "@/modules/security/store/user-store";

const columns = [
  {
    field: "name_group",
    header: "group.name_group",
    expander: true,
  },
  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
  },
];

export class Group extends BaseModel {
  @ID
  @NotSavable
  id_group: number | undefined;
  name_group: string | undefined;
  father_group: number | undefined;
  @NotSavable
  children: [] | undefined;
  @NotSavable
  mpath: string | undefined;
  @NotSavable
  key: number | undefined;
  @NotSavable
  data: object | undefined;
  static readonly url: string = "groups";
  static readonly columns = columns;
  static readonly schema = schema;

  public getUpdateSchema() {
    return updateSchema;
  }

  public async getElementsForTreeTable(body:object) {
    const groups = await this.getAll(body);
    const data = renameTreeForTreeTable(groups.data.length ? groups.data : [groups.data]);
    return {
      ...groups,
      data: groups.data
    }
  }
  public static async getUsersFromCurrentGroup( params = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/groups/users_from_group/${userStore().assignments[0].group_id}`,
      body: params,
    });
  }
  public static async getUsersWithLeadershipAndIncompatibilities(id: number, params = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/groups/users_with_compatibility/${id}`,
      body: params,
    });
  }

  
}
