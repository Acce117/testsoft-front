import { useQuery } from "@tanstack/vue-query";
import { Test } from "../models/test.model";

export const useTestToExecute = (id: string) => {
  const { data, isPending, isSuccess, error, isRefetching, refetch, isError } =
    useQuery({
      queryKey: ["test-to-execute"],
      queryFn: () =>
        new Test({ id_test: id }).getOne({
          relations: [
            {
              name: "series",
              relations: [
                {
                  name: "questions",
                  relations: [
                    {
                      name: "type",
                    },
                    {
                      name: "answers",
                    }
                  ]
                }
              ]
            }
          ]
        }),
    });
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching };
};
