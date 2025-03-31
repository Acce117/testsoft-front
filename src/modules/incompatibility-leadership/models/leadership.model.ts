import { BaseModel } from "@/common/utils/BaseModel";
import { ID } from "@/common/utils/Decorators";

const columns = [
  // {
  //   field: "rol_name",
  //   header: "general.name",
  // },
  // {
  //   field: "rol_descrip",
  //   header: "general.description",
  // },
];

export class Leadership extends BaseModel {
  @ID
  leadership_id: number | undefined;
  fk_user_destination: number | undefined;
  fk_user_origin:number | undefined;
  static readonly url: string = "leadership";
  static readonly columns = columns;
  // static readonly schema = schema;

}
