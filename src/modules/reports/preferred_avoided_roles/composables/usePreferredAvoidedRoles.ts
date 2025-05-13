import { useQuery } from '@tanstack/vue-query'
import { PreferredAvoidedRoles } from '../models/preferredAvoidedRoles.model'

export const usePreferredAvoidedRoles = (getSelectedGroup:Function) => {
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
      return await  PreferredAvoidedRoles.getPreferredAvoidedRolesInGroup(getSelectedGroup())
    } 

  })
  return { data, isPending, isSuccess, error, isError, refetch, isRefetching }
}
