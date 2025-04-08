import { useQuery } from '@tanstack/vue-query'
import {  Group } from '../models/group.model'

export const useUsersFromCurrentGroup = (getSelectedGroup:Function) => {
  const {
    data: users,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['users-from-current-group'],
    queryFn:async ()=>{
      return await  Group.getUsersFromCurrentGroup(getSelectedGroup())
    } 

  })
  return { users, isPending, isSuccess, error, isError, refetch, isRefetching }
}
