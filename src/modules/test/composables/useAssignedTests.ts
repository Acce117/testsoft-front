import { useQuery } from '@tanstack/vue-query'
import {Test } from '../models/test.model'

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
    queryFn:()=> new Test().getAll()
  })
  return { tests, isPending, isSuccess, error, isError, refetch, isRefetching }
}
