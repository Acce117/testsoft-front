import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";
import { sendRequest } from "@/common/utils/sendRequest";
import { FunctionalRole } from "@/modules/management/functional-roles/models/functional-role.model";

export class SelectedRole extends BaseModel {
  @ID
  id_selected_rol: number | undefined;
  fk_id_user: number | undefined;
  fk_id_rol: number | undefined;
  fk_id_group: number | undefined;

  preferred: boolean | undefined;
  static readonly url: string = "selected_role";
  static readonly columns = [];
  // static readonly schema = schema;

  public static async getSelectedRoles(queryParams: object) {
    const roles = await FunctionalRole.getAll(queryParams);

    const selectedRoles: SelectedRole[] = await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/user/selected_roles`,
    });
    const result = roles.data.map((role:FunctionalRole) => {
      return {
        ...role,
        selected_roles: selectedRoles.find(
          (selectedRole) => selectedRole.fk_id_rol == role.id_rol
        ),
      };
    });
    console.log(result);
    return roles;
  }
}
