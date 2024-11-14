import { useQuery } from '@tanstack/vue-query'
import { AssignedTest } from '../models/assigned-test.model'

export const useAssignedTests = () => {
  const {
    data: tests,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['tests'],
    queryFn:()=> new AssignedTest().getAll()
  })
  return { tests, isPending, isSuccess, error, isError, refetch, isRefetching }
}
