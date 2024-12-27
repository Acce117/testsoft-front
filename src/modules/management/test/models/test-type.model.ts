
import { BaseModel } from "@/core/BaseModel";

const url = "type_psi_test";



export class TestType extends BaseModel {
  id_type_test;
  type_test_name;
  description;



  constructor(data: any = null) {
    super();

    if (data) {
      this.id_type_test = data.id_type_test;
      this.type_test_name = data.type_test_name;
      this.description = data.description;
  


    }
  }

  public setData(data: any) {
    this.id_type_test = data.id_type_test;
    this.type_test_name = data.type_test_name;
    this.description = data.description;


  }

  public clearData() {
    this.id_type_test = undefined;
    this.type_test_name =undefined;
    this.description = undefined;
 


  }

  public getURL(): string {
    return url;
  }

  

  public getFieldAsID(): string {
    return "id_type_test";
  }

  
}

 


