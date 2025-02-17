import { BaseModel } from "@/common/utils/BaseModel";
import type { Answer } from "../answer/answer.model";
import { schema } from "./question.schema";
import { sendRequest } from "@/common/utils/sendRequest";
import { QuestionTopValue } from "../question-top-value/question-top-value.model";
import { QuestionType } from "../question-type/question-type.model";
import { ID } from "@/common/utils/Decorators";


export class Question extends BaseModel {
  @ID
  id_question:number|undefined;
  statement:string|undefined;
  image;
  fk_id_serie:number|undefined;
  fk_id_type_question:number|undefined;
  answers: Answer[] = [];
  top_value:QuestionTopValue|undefined;
  type:QuestionType|undefined;
  static readonly url: string = "question";
  static readonly schema = schema;



  public setData(data: object) {
    super.setData(data);
    this.top_value = data.top_value
      ? new QuestionTopValue(data.top_value)
      : new QuestionTopValue();
      this.type = data.type
      ? new QuestionType(data.type)
      : new QuestionType();
  }

  
  async create() {
    const form = new FormData();
    form.append("statement", this.statement);
    form.append("fk_id_serie", this.fk_id_serie);
    form.append("fk_id_type_question", this.fk_id_type_question);
    if (this.image) form.append("file", this.image);


    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}?_method=PATCH`,
      method: "POST",
      body: form,
      isFormData:true
    });
  }

  async update() {
    const form = new FormData();
    form.append("statement", this.statement);
    form.append("fk_id_serie", this.fk_id_serie);
    form.append("fk_id_type_question", this.fk_id_type_question);
    if (this.image) form.append("file", this.image);

    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: form,
      isFormData:true
    });
  }
  public clearData() {
    super.clearData()
    this.type =  new QuestionType()
    this.top_value =new QuestionTopValue();
  }

}
