
import { BaseModel } from "@/core/BaseModel";

const url = "groups";
const columns = [
  {
    field: "name_group",
    header: "Nombre",
  },
  {
    field: "father_group",
    header: "Grupo Padre",
  },
];


export class Group extends BaseModel {
  id_group;
  name_group;

  father_group;
  mpath;


  constructor(data: any = null) {
    super();

    if (data) {
      this.id_group = data.id_group;
      this.name_group = data.name_group;
      this.father_group = data.father_group;
      this.mpath = data.mpath;


    }
  }

  public setData(data: any) {
    this.id_group = data.id_group;
    this.name_group = data.name_group;
    this.father_group = data.father_group;
    this.mpath = data.mpath;

  }

  public clearData() {
    this.id_group = undefined;
    this.name_group =undefined;
    this.father_group = undefined;
    this.mpath = undefined;

  }

  public getURL(): string {
    return url;
  }

  public getColumns() {
    return columns;
  }
  // public getSchema() {
  //   return schema;
  // }

  public getFieldAsID(): string {
    return "id_group";
  }

  
}

 


