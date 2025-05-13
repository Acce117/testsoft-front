import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

const columns = [

];

export class SelectedRole extends BaseModel {
  @ID
  id_selected_rol: number | undefined;
  fk_id_user: number | undefined;
  fk_id_rol:number | undefined;
  preferred: boolean | undefined;
  static readonly url: string = "selected_rol";
  static readonly columns = columns;
  // static readonly schema = schema;

}
