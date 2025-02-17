import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./category.schema";
import type { Item } from "../item/item.model";
import { ID, NotSavable } from "@/common/utils/Decorators";

export class Category extends BaseModel {
  @ID
  id_category:number|undefined;
  name:string|undefined;
  description:string|undefined;
  @NotSavable
  items: Item[] = [];
  static readonly url: string = "category";
  static readonly schema = schema;

}
