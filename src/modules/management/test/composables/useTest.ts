import { useQuery } from "@tanstack/vue-query";
import { Test } from "../models/test.model";

export const useTest = (
  id: string,
  cb: (d) => void,
  getRelationsCb: () => [],
  enabled:boolean=true
) => {
  const { data, isPending, isSuccess, error, isRefetching, refetch, isError } =
    useQuery({
      queryKey: ["test"],
      queryFn: async () => {
        const relations = getRelationsCb();

        const test = await Test.getOne(id, {
          relations: relations,
        });
        test.fk_id_type_test = test.type_psi_test.id_type_test;
        cb(test);
        return test;
      },
      enabled:enabled
    });
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching };
};
