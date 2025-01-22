import { useQuery } from '@tanstack/vue-query'
import {Test } from '../../management/test/models/test.model'
import { userStore } from '@/modules/security/store/user-store'

export const useAssignedTests = (cb:(test:any)=>void) => {
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
    queryFn: async ()=> {
      const test = await new Test().getAssignedTests(userStore().user_id)
      cb(test)
      return  test
    }
  })
  return { tests, isPending, isSuccess, error, isError, refetch, isRefetching }
}
