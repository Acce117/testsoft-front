import { renameTreeForTreeTable } from "@/common/utils/renameTree";
import { BaseModel } from "@/common/utils/BaseModel";
import { schema, updateSchema } from "../schemas/group.schema";
import { sendRequest } from "@/common/utils/sendRequest";

const columns = [
  {
    field: "name_group",
    header: "group.name_group",
    expander: true,
  },
];

export class Group extends BaseModel {
  id_group;
  name_group;
  father_group;
  children;
  mpath;
  static readonly url: string = "groups";
  static readonly field_as_id: string =  "id_group";


  public getColumns() {
    return columns;
  }

  async update() {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${url}/${this.getID()}`,
      body: {
        name_group: this.name_group,
        father_group: this.father_group,
      },
    });
  }

  public getSchema() {
    return schema;
  }
  public getUpdateSchema() {
    return updateSchema;
  }

  

  public async getElementsForTreeTable() {
    const groups = await this.getAll();

    return renameTreeForTreeTable(groups.length ? groups : [groups]);
  }
}
