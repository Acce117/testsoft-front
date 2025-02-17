import { useQuery } from "@tanstack/vue-query";
import { TestType } from "./test-type.model";

export const useTestTypes = () => {
  const {
    data: testTypes,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["test-types"],
    queryFn: async () => await TestType.getAll(),
  });
  return {
    testTypes,
    isPending,
    isSuccess,
    error,
    isError,
    refetch,
    isRefetching,
  };
};
