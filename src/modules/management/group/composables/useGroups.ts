import { useQuery } from '@tanstack/vue-query'
import {  Group } from '../models/group.model'
import { renameTree } from '@/common/utils/renameTree'

export const useGroups = () => {
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
      return renameTree(groups.data.length?groups.data:[groups.data], 'name_group','id_group')
    } 

  })
  return { groups, isPending, isSuccess, error, isError, refetch, isRefetching }
}
export const useGroupsWithTest = () => {
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
      const groups = await new Group().getAll({relations:['psiTests']})
      return renameTree(groups.length?groups:[groups], 'name_group','id_group')
    } 

  })
  return { groups, isPending, isSuccess, error, isError, refetch, isRefetching }
}
