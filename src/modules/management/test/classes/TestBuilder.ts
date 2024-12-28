import type { Test } from "@/modules/test/models/test.model";
import type { ParameterDisplayResult } from "../models/parameter-display-result.model";
import type { Serie } from "../models/serie.model";

export class TestBuilder {
  private test: Test;

  constructor(test: Test) {
    this.test = test;
  }

  public getTest(){
    return this.test
  }

  public async setGeneralData(){
     const response = await this.test.create()
     this.test.id_test =  response.identifiers[0].id_test
      //IMPLEMENT FORMULE CREATION

  }

  public setSeriesAndQuestions(series: Serie[]) {
    //IMPLEMENT SERIES CREATION
    console.log(series);
  }
  
  public async setParameterDisplayResult(parameterDisplayResult: ParameterDisplayResult) {
    parameterDisplayResult.fk_id_test=this.test.getID()
    return await parameterDisplayResult.create()
  }
}
