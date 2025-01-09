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
    const clone = { ...this };
    delete clone.correct_answer;
    delete clone.tribute;
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: clone,
    });
  }

  async update() {
    const clone = { ...this };
    delete clone.correct_answer;
    delete clone.tribute;
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: clone,
    });
  }

  public getFieldAsID(): string {
    return "id_answer";
  }
}
