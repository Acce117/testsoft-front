import { useQuery } from "@tanstack/vue-query";
import { Test } from "../models/test.model";

export const useTest = (id: string, cb: (d) => void) => {
  const { data, isPending, isSuccess, error, isRefetching, refetch, isError } =
    useQuery({
      queryKey: ["test"],
      queryFn: async () => {
        const test = await new Test({ id_test: id }).getOne({
          relations: [
            {
              name: "type_psi_test",
            },
            {
              name: "equation",
            },
            {
              name: "category",
              relations: ["items"],
            },
            {
              name: "classifications",
            },
            {
              name: "display_parameters",
            },
            {
              name: "series",
              relations: [
                {
                  name: "questions",
                  relations: [ "type","answers", "top_value"],
                },
              ],
            },
          ],
        });
        test.fk_id_type_test = test.type_psi_test.id_type_test;
        cb(test);
        return test;
      },
    });
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching };
};
