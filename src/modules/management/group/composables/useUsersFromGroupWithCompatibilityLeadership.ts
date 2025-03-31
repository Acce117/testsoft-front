import { useQuery } from '@tanstack/vue-query'
import {  Group } from '../models/group.model'

export const useUsersFromGroupWithCompatibilityLeadership = (getSelectedGroup:Function) => {
  const {
    data: users,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['users-from-group-compatibility-leadership'],
    queryFn:async ()=>{
      return await  Group.getUsersWithLeadershipAndIncompatibilities(getSelectedGroup())
    } 

  })
  return { users, isPending, isSuccess, error, isError, refetch, isRefetching }
}
