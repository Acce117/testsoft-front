import { isAxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import HttpError from './exceptions/HttpError'
import { axiosInstance } from './axios.config'
import TokenHandler from '@/common/utils/token-handler'

export const sendRequest = async (options: {
  url: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH'
  requiresAuth?: boolean
  body?: Record<string, any>
  onSuccessFunction?: () => void
}) => {
  try {
    const token = TokenHandler.getToken()
    const {
      url,
      method = 'GET',
      requiresAuth = true,
      body = {},
    } = options
    const axiosConfig: AxiosRequestConfig = {
      url: url,
      method: method,
      headers:
        requiresAuth && token !== null
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
    }
    method === 'GET' ? (axiosConfig.params = body) : (axiosConfig.data = body)
    const res: AxiosResponse = await axiosInstance.request(axiosConfig)
    if(res){
      if (res.status === 200 || res.status === 201) {
        console.log(res)
        return res.data
      }
    }else throw new HttpError('Servidor no responde', 500)
    
  } catch (err) {
    console.log(err)
    if (isAxiosError(err)) throw new HttpError(err.message, err.status ?? 500)
    if (err instanceof HttpError) throw new HttpError(err.message, err.statusCode)
    else throw new Error('Error del servidor')
  }
}
