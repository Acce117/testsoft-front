import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./answer.schema";
import { CorrectAnswer } from "../correct_answer/correct_answer.model";
import { Tribute } from "../tribute/tribute.model";
import { sendRequest } from "@/common/utils/sendRequest";
import { ID } from "@/common/utils/Decorators";

export class Answer extends BaseModel {
  @ID
  id_answer;
  text;
  fk_id_question;
  correct_answer = new CorrectAnswer();
  tribute = new Tribute();
  is_correct;
  image = null;
  static readonly url: string = "answer";

  
  public setData(data: object) {
    console.log('asdsadasds')
    super.setData(data);
    this.correct_answer = data.correct_answer
      ? new CorrectAnswer(data.correct_answer)
      : new CorrectAnswer();
    this.tribute = data.tribute ? new Tribute(data.tribute) : new Tribute();
  }

  public clearData() {
    super.clearData();
    this.tribute = new Tribute();
    this.correct_answer = new CorrectAnswer();
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
      isFormData: true,
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
      isFormData: true,
    });
  }
}
