
import { renameTree, renameTreeForTreeTable } from "@/common/utils/renameTree";
import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/group.schema";

const url = "groups";
const columns = [
  {
    field: "name_group",
    header: "Nombre",
    expander:true
  },
  
];


export class Group extends BaseModel {
  id_group;
  name_group;

  father_group;
  children;
  mpath;


  constructor(data: any = null) {
    super();

    if (data) {
      this.id_group = data.id_group;
      this.name_group = data.name_group;
      this.father_group = data.father_group;
      this.mpath = data.mpath;
      this.children = data.children;



    }
  }

  public setData(data: any) {
    this.id_group = data.id_group;
    this.name_group = data.name_group;
    this.father_group = data.father_group;
    this.mpath = data.mpath;
    this.children = data.children;


  }

  public clearData() {
    this.id_group = undefined;
    this.name_group =undefined;
    this.father_group = undefined;
    this.mpath = undefined;
    this.children = undefined;


  }

  public getURL(): string {
    return url;
  }

  public getColumns() {
    return columns;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_group";
  }

  public async getElementsForTreeTable (){
    const groups = await this.getAll()
    return renameTreeForTreeTable(groups)
  }

  
}

 


