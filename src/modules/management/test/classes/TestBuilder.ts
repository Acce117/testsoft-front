import type { Test } from "@/modules/management/test/models/test.model";
import { Serie } from "../modules/serie/serie.model";
import { Category } from "../modules/category/category.model";
import { Question } from "../modules/question/question.model";
import { Item } from "../modules/item/item.model";
import { Answer } from "../modules/answer/answer.model";
import { Classification } from "../modules/classification/classification.model";
import { TestRange } from "../modules/test_range/test_range.model";
import { Range } from "../modules/range/range.model";

export class TestBuilder {
   test: Test;

  constructor(test: Test) {
    this.test = test;
  }

  public getTest() {
    return this.test;
  }

  public async closeTest() {
    this.test.done = true
    await this.test.update();
  }

  public async setGeneralData() {
    this.test.done = false
    await this.test.update();
    await this.setEquation();
  }

  public async setEquation() {
    if (this.test.equation?.fk_id_test) {
      await this.test.equation?.update();
    } else if (this.test.equation.equation && this.test.equation?.equation.trim() != "") {
      this.test.equation.fk_id_test = this.test.id_test;
      await this.test.equation?.create();
    }
  }
  //SERIE

  public async saveSerie(serie: Serie) {
    if (serie.id_serie) {
      await serie.update();
    } else {
      serie.fk_id_test = this.test.id_test;
      await serie.create();
    }
  }
  public async deleteSerie(id: number) {
    return await new Serie().delete(id);
  }

  //QUESTION

  public async saveQuestion(question: Question, id_serie: number) {
    if (question.id_question) {
      await question.update();
    } else {
      question.fk_id_serie = id_serie;
      const response = await question.create();
      question.id_question = response.id_question;
    }
    if (
      question.fk_id_type_question == 5 ||
      question.type.id_type_question == 5
    )
      await this.setTopValue(question);
  }
  public async deleteQuestion(id: number) {
    return await new Question().delete(id);
  }

  public async setTopValue(question: Question) {
    if (question.top_value.id_top_value) {
      await question.top_value.update();
    } else {
      question.top_value.fk_id_question = question.id_question;
      await question.top_value.create();
    }
  }
  //ANSWER
  public async saveAnswer(answer: Answer, id_question: number) {
    if (answer.id_answer) {
      await answer.update();
    } else {
      answer.fk_id_question = id_question;
      const response = await answer.create();
      answer.id_answer = response.id_answer;
    }
    if (answer.tribute.fk_id_item) await this.setTribute(answer);
    if (this.test.type_psi_test.id_type_test==1) await this.setCorrectAnswer(answer);

  }

  public async setTribute(answer: Answer) {
    if (answer.tribute.fk_id_answer) {
      await answer.tribute.update();
    } else {
      answer.tribute.fk_id_answer = answer.id_answer;
      await answer.tribute.create();
    }
  }
  public async setCorrectAnswer(answer: Answer) {
    if (answer.is_correct) {
      answer.correct_answer.fk_id_answer = answer.id_answer;
      await answer.correct_answer.create();
    } else if(answer.correct_answer.id_correct_answer) {
      await answer.correct_answer.delete()
    }
  }

  public async deleteAnswer(id: number) {
    return await new Answer().delete(id);
  }
  //CATEGORY

  public async saveCategory(category: Category) {
    if (category.id_category) {
      await category.update();
    } else {
      category.tests = [this.test.id_test];
      await category.create();
    }
  }
  public async deleteCategory(id: number) {
    return await new Category().delete(id);
  }

  //ITEM

  public async saveItem(item: Item, id_category: number) {
    if (item.id_item) {
      await item.update();
    } else {
      item.fk_category = id_category;
      await item.create();
    }
  }
  public async deleteItem(id: number) {
    return await new Item().delete(id);
  }

  //ANSWER
  public async saveRange(range: Range, id_item: number) {
    if (range.id_range) {
      await range.update();
    } else {
      range.fk_id_item = id_item;
      await range.create();
    }
  }
  public async deleteRange(id: number) {
    return await new Range().delete(id);
  }

  //CLASSIFICATION

  public async saveClassification(classification: Classification) {
    if (classification.id_classification) {
      await classification.update();
    } else {
      classification.fk_id_test = this.test.id_test;
      await classification.create();
    }
  }
  public async deleteClassification(id: number) {
    return await new Classification().delete(id);
  }

  //TEST_RANGE

  public async saveTestRange(test_range: TestRange, id_classification: number) {
    if (test_range.id_test_range) {
      await test_range.update();
    } else {
      test_range.fk_id_classification = id_classification;
      await test_range.create();
    }
  }
  public async deleteTestRange(id: number) {
    return await new TestRange().delete(id);
  }

  //PARAMETER_DISPLAY_RESULT

  public async saveParameterDisplayResult() {
    if (this.test.display_parameters.id_parameter_display) {
      await this.test.display_parameters.update();
    } else {
      this.test.display_parameters.fk_id_test = this.test.id_test;
      await this.test.display_parameters.create();
    }
  }
}
