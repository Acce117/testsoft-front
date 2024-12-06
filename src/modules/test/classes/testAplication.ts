import { userStore } from "@/modules/security/store/user-store";
import type { Question } from "./question-class";
import { useSendRequest } from "@/common/utils/fetch";

export class TestAplication {
  questions: { [key: string]: Question<any> };
  name: string | undefined;
  type: string | number | undefined;

  public constructor(readonly id_test: number | string) {
    this.questions = {};
  }

  public sendTest() {
    return useSendRequest(
      true,
      `${import.meta.env.VITE_API_PATH}/execute_test/execute_Test`,
      { id_test: parseInt(this.id_test), answers: Object.values(this.questions) },
      "POST"
    );
  }

  public getQuestionsNotAnswered(questions: Array<any>) {
    let questionsNotAnswered = Array();
    questions.forEach((question, index) => {
      if (!this.validateSpecificQuestion(question.id_question))
        questionsNotAnswered.push({
          questionIndex: index + 1,
          question: question,
        });
    });
    return questionsNotAnswered;
  }

  validateSpecificQuestion(id_question: string | number) {
    return !Object.prototype.hasOwnProperty.call(this.questions, id_question)
      ? false
      : this.questions[id_question].validateQuestion();
  }
}
