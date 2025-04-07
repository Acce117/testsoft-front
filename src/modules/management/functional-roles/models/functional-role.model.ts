import { BaseModel } from "@/common/utils/BaseModel";
import { sendRequest } from "@/common/utils/sendRequest";
import { ID } from "@/common/utils/Decorators";
import schema from "../schemas/functional-role.schema";
import { columns } from "./functional-role.columns";


export class FunctionalRole extends BaseModel {
  @ID
  id_rol: number | undefined;
  rol_name: string | undefined;
  rol_descrip: string | undefined;
  static readonly url: string = "functional_role";
  static readonly columns = columns;
  static readonly schema = schema;

  public async getFunctionalRolesByGroup(
    queryParams: object,
    id_group: string | number
  ) {
    const groups = await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/groups/parents/${id_group}`,
      body: { relations: ["functional_roles"] },
    });
    return groups[0].functional_roles;
  }
}
