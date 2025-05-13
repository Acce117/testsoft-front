import { useQuery } from '@tanstack/vue-query'
import { TestedInGroup } from '../models/testedInGroup.model'

export const useTestedInGroup = (getSelectedGroup:Function) => {
  const {
    data,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['tested-in-group'],
    queryFn:async ()=>{
      return await  TestedInGroup.getTestedInGroup(getSelectedGroup())
    } 

  })
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching }
}
