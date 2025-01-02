import { renameTree, renameTreeForTreeTable } from "@/common/utils/renameTree";
import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/group.schema";
import { sendRequest } from "@/core/sendRequest";

const url = "groups";
const columns = [
  {
    field: "name_group",
    header: "Nombre",
    expander: true,
  },
];

export class Group extends BaseModel {
  id_group;
  name_group;

  father_group;
  children;
  mpath;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data, this);
  }

  public getURL(): string {
    return url;
  }

  public getColumns() {
    return columns;
  }

  async update() {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: {
        name_group: this.name_group,
        father_group: this.father_group,
      },
    });
  }

  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_group";
  }

  public async getElementsForTreeTable() {
    const groups = await this.getAll();
    return renameTreeForTreeTable(groups);
  }
}
