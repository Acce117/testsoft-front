import { useQuery } from "@tanstack/vue-query";
import { TestResult } from "../models/testResult.model";

export const useResults = (id_test_application:number) => {
  const {
    data: testResult,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["test-result"],
    queryFn: async () => {console.log(id_test_application)
     return  await new TestResult({id_test_application:id_test_application}).getOne()},
  });
  return {
    testResult,
    isPending,
    isSuccess,
    error,
    isError,
    refetch,
    isRefetching,
  };
};
