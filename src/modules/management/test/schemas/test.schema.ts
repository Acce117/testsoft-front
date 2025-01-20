import { boolean, number, object, string } from "yup";

export const schema = object({
  name: string().required(),
  description: string().required(),
  navigable: boolean().required(),
  completed: boolean().required(),
  language: string().required(),
  fk_id_type_test: number().required(),
  equation: string().nullable().test("is-valid-equation", "Ecuación inválida", (value) => {
      if (!value ) {
        return true;
      }
      const equationRegex = /\\d+(\\.\\d+)*|[\\(\\)\\+\\-\\*\\/]/
      return equationRegex.test(value);
    }),
});
