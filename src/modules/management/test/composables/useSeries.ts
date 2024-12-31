import { useQuery } from "@tanstack/vue-query";
import { Serie } from "../models/serie.model";

export const useSeries = (id_test: number) => {
  const {
    data: series,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["series"],
    queryFn: async () =>
      await new Serie().getAll({
        where: { fk_id_test: id_test },
        relations: ["questions", "questions.answer"],
      }),
  });
  return {
    series,
    isPending,
    isSuccess,
    error,
    isError,
    refetch,
    isRefetching,
  };
};
