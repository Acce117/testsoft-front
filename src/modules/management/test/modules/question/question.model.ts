import { BaseModel } from "@/common/utils/BaseModel";
import type { Answer } from "../answer/answer.model";
import { schema } from "./question.schema";
import { sendRequest } from "@/common/utils/sendRequest";
import { QuestionTopValue } from "../question-top-value/question-top-value.model";
import { QuestionType } from "../question-type/question-type.model";

const url = "question";

export class Question extends BaseModel {
  id_question;
  statement;
  image;
  fk_id_serie;
  fk_id_type_question;
  answers: Answer[] = [];
  top_value;
  type;

  constructor(data: object = {}) {
    super(data);
    this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
    this.top_value = data.top_value
      ? new QuestionTopValue(data.top_value)
      : new QuestionTopValue();
      this.type = data.type
      ? new QuestionType(data.type)
      : new QuestionType();
  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
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

  public getFieldAsID(): string {
    return "id_question";
  }
}
