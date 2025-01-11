import { BaseModel } from "@/core/BaseModel";
import { schema } from "./answer.schema";
import { CorrectAnswer } from "../correct_answer/correct_answer.model";
import { Tribute } from "../tribute/tribute.model";
import { sendRequest } from "@/core/sendRequest";

const url = "answer";

export class Answer extends BaseModel {
  id_answer;
  text;
  fk_id_question;
  correct_answer;
  tribute;
  image = null;

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }

  public setData(data: object) {
    super.setData(data);
    this.correct_answer = data.correct_answer
      ? new CorrectAnswer(data.correct_answer)
      : new CorrectAnswer();
    this.tribute = data.tribute ? new Tribute(data.tribute) : new Tribute();
  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }
  async create() {
    const form = new FormData();
    if (this.image) form.append("file", this.image);
    form.append("text", this.text);
    form.append("fk_id_question", this.fk_id_question);

    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}?_method=PATCH`,
      method: "POST",
      body: form,
      isFormData:true
    });
  }

  async update() {
    const form = new FormData();
    if (this.image) form.append("file", this.image);
    form.append("text", this.text);
    form.append("fk_id_question", this.fk_id_question);
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: form,
      isFormData:true
    });
  }

  public getFieldAsID(): string {
    return "id_answer";
  }
}
