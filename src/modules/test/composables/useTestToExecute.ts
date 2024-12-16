import { useQuery } from "@tanstack/vue-query";
import { Test } from "../models/test.model";

export const useTestToExecute = (id: string, cb:(d)=>void) => {
  const { data, isPending, isSuccess, error, isRefetching, refetch, isError } =
    useQuery({
      queryKey: ["test-to-execute"],
      queryFn: async () =>{
        const test= await new Test({ id_test: id }).getOne({
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
                    },
                    {
                      name: 'top_value'
                    }
                  ]
                }
              ]
            }
          ]
        })
        cb(test)
        return test
      },
    });
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching };
};
