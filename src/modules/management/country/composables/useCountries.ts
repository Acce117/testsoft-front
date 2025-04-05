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
    queryFn: async ()=> {
      const countries =  await Country.getAll()
      return countries.data
    }
      
  })
  return { countries, isPending, isSuccess, error, isError, refetch, isRefetching }
}
