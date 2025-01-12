import { number, object, string } from "yup";

export const schema = object({
  indicator: string().required(),
  description: string().required(),
  min_val: number().required().test(
    "min_val",
    "El valor mínimo no puede ser mayor que el valor máximo",
    function (value, original) {
  
      const { min_val, max_val } = original.parent; 
      if (min_val != undefined && max_val != undefined && min_val > max_val) {
        return false;
      }
      return true;
    }
  ),
  max_val: number().required(),
})
