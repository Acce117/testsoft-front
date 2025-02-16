import { useQuery } from "@tanstack/vue-query";
import { Test } from "../models/test.model";

export const useGroupsOfTest = (id: string) => {
  const { data, isPending, isSuccess, error, isRefetching, refetch, isError } =
    useQuery({
      queryKey: ["groups-of-test"],
      queryFn: async () =>
        await Test.getOne(id, {
          relations: ["groups"],
        }),
    });
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching };
};
