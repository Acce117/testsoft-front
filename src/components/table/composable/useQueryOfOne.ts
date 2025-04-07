import type { BaseModel } from "@/common/utils/BaseModel";
import { useQuery } from "@tanstack/vue-query";

export const useQueryOfOne = (queryKey:string, model:BaseModel, queryOptions?:object) => {
  const { data: dataOfOne, isPending:isPendingOfOne, isSuccess:isSuccessOfOne, isError: isErrorOfOne, error: errorOfOne, isRefetching: isRefetchingOfOne, refetch:refetchOfOne} =
    useQuery({
      queryKey: [queryKey + "-one"],
      queryFn: () => model.getOne(queryOptions),
      enabled: false,
    });

  return {
    dataOfOne,
    isPendingOfOne,
    isSuccessOfOne,
    errorOfOne,
    isErrorOfOne,
    refetchOfOne,
    isRefetchingOfOne,
  };
};
