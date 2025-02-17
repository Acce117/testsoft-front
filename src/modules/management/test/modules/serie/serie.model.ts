import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "./serie.schema";
import { ID, NotSavable } from "@/common/utils/Decorators";
import type { Question } from "../question/question.model";

export class Serie extends BaseModel {
  @ID
  id_serie: number | undefined;
  name: string | undefined;
  description: string | undefined;
  time_serie_duration = 0;
  @NotSavable
  questions: Question[] = [];
  fk_id_test: number | undefined;
  static readonly url: string = "test_serie";
  static readonly schema = schema;
}
