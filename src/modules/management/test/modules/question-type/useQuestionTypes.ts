import { useQuery } from "@tanstack/vue-query";
import { QuestionType } from "./question-type.model";

export const useQuestionTypes = () => {
  const {
    data: questionTypes,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["question-types"],
    queryFn: async () => {
      const questionTypes = await  QuestionType.getAll()
      return questionTypes.data
    }
      
  });
  return {
    questionTypes,
    isPending,
    isSuccess,
    error,
    isError,
    refetch,
    isRefetching,
  };
};
