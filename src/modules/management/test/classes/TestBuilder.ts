import type { Test } from "@/modules/management/test/models/test.model";
import { Serie } from "../modules/serie/serie.model";
import { Category } from "../modules/category/category.model";
import { Question } from "../modules/question/question.model";
import { Item } from "../modules/item/item.model";

export class TestBuilder {
  private test: Test;

  constructor(test: Test) {
    this.test = test;
  }

  public getTest() {
    return this.test;
  }

  public async setGeneralData() {
    const response = await this.test.update();
    //IMPLEMENT FORMULE CREATION
  }

  public async createSerie(serie: Serie) {
    serie.fk_id_test = this.test.id_test;
    return await serie.create();
  }
  public async deleteSerie(id: number) {
    return await new Serie().delete(id);
  }

  public async createCategory(category: Category) {
    category.fk_id_test = this.test.id_test;
    return await category.create();
  }
  public async deleteCategory(id: number) {
    return await new Category().delete(id);
  }

  public async createItem(item: Item, id_category: number) {
    item.fk_category = id_category;
    return await item.create();
  }
  public async deleteItem(id: number) {
    return await new Item().delete(id);
  }

  public async createQuestion(question: Question, id_serie: number) {
    question.fk_id_serie = id_serie;
    question.image = 0
    return await question.create();
  }
  public async deleteQuestion(id: number) {
    return await new Question().delete(id);
  }

  public setCategoriesAndItems(categories: Category[]) {
    //IMPLEMENT Categories CREATION
    console.log(categories);
  }

  public async createParameterDisplayResult() {
    this.test.display_parameters.fk_id_test = this.test.getID();
    return await this.test.display_parameters.create();
  }
  public async updateParameterDisplayResult() {
    return await this.test.display_parameters.update();
  }
}
