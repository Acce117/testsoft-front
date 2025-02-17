import { useQuery } from '@tanstack/vue-query'
import {  Group } from '../models/group.model'
import { renameTreeAndRemoveNode } from '@/common/utils/renameTree'

export const useGroupsForGroupUpdate = (id_parent:number) => {
  const {
    data: groups,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['groups'],
    queryFn:async ()=>{
      const groups = await  Group.getAll()
      return renameTreeAndRemoveNode(groups.length?groups:[groups], 'name_group','id_group',id_parent)
    } 

  })
  return { groups, isPending, isSuccess, error, isError, refetch, isRefetching }
}
