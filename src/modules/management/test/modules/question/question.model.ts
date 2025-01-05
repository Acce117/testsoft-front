import { BaseModel } from "@/core/BaseModel";
import type { Answer } from "../answer/answer.model";
import { schema } from "./question.schema";
import { sendRequest } from "@/core/sendRequest";
import { QuestionTopValue } from "../question-top-value/question-top-value.model";

const url = "question";

export class Question extends BaseModel {
  id_question;
  statement;
  image;
  fk_id_serie;
  fk_id_type_question;
  answers: Answer[] = [];
  top_value ;

  constructor(data: object = {}) {
    super(data);
    this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
    this.top_value= new QuestionTopValue() 
  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }
  async update() {
    const clone = { ...this };
    delete clone.answers;
    delete clone.top_value;
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: clone,
    });
  }

  public getFieldAsID(): string {
    return "id_question";
  }
}
