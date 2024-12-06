import { useQuery } from '@tanstack/vue-query'
import {Test } from '../models/test.model'
import { userStore } from '@/modules/security/store/user-store'

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
    queryFn:()=> new Test().getAssignedTests(userStore().user_id)
  })
  return { tests, isPending, isSuccess, error, isError, refetch, isRefetching }
}
