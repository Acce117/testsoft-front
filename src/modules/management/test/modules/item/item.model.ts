import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./item.schema";
import type { Range } from "../range/range.model";
import { ID, NotSavable } from "@/common/utils/Decorators";


export class Item extends BaseModel {
  @ID
  id_item:number|undefined;
  name:string|undefined;
  description:string|undefined;
  fk_category:number|undefined;
  priority:number|undefined = 0;
  @NotSavable
  ranges: Range[] = [];
  static readonly url: string = "item";
  static readonly schema = schema;

}
