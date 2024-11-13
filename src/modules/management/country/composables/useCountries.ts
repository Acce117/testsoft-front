import { useQuery } from '@tanstack/vue-query'
import { Country } from '../models/country.model'

export const useCountries = () => {
  const {
    data: countries,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
  } = useQuery({
    queryKey: ['countries'],
    queryFn:()=> new Country().getAll()
  })
  return { countries, isPending, isSuccess, error, isError, refetch, isRefetching }
}
