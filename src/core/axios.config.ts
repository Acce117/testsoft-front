import axios, { type AxiosResponse } from "axios";
import HttpError from "./exceptions/HttpError";
import TokenHandler from "@/common/utils/token-handler";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.get["Accept"] = "application/json";

axiosInstance.interceptors.response.use(undefined, async (res) => {
  switch (res.response?.status) {
    case 400:
      {
        if (res.response.data.errors)
          throw new HttpError(
            (
              Object.values(res.response.data.errors).flatMap(
                (e) => e
              ) as string[]
            ).join(" "),
            400
          );
        if (res.response.data.message)
          throw new HttpError(res.response.data.message, 400);
      }
      break;
    case 401: {
      // if (res.config.url.includes('refresh')) {
      //   useAuthStore().setAuth('')
      //   useAuthStore().setRefresh('')
      //   useAuthStore().setPermissions('')
      //   useAuthStore().setClientStorage(null)
      //   useAuthStore().setRequestLoanStorage('1')

      //   router.push('/')
      // } else if (res.config.url.includes('logout')) router.push('/')
      // else
      //  if (res.config.url.includes('login'))
      //   throw new HttpError('Credenciales incorrectas', 400)
      // else if (res.config.url.includes('change_password'))
      //   throw new HttpError('La contraseña antigua no coincide con la proporcionada', 400)
      // else {
      //   const refreshResponse: AxiosResponse = await axiosInstance.post(
      //     `${import.meta.env.VITE_API_URL}/site/refresh`,
      //     {},
      //     {
      //       headers: {
      //         Authorization: `${TokenHandler.getRefreshToken()}`
      //       }
      //     }
      //   )

      //   if (refreshResponse.status === 200) {
      //     useAuthStore().setAuth(
      //       AES.encrypt(
      //         refreshResponse.data.access_token,
      //         import.meta.env.VITE_CRYPTOKEY
      //       ).toString()
      //     )
      //   }
      // }
      throw new HttpError("No está autenticado", 401);

      break;
    }
    case 403: {
      // useAuthStore().setAuth('')
      // useAuthStore().setPermissions('')
      // useAuthStore().setRefresh('')
      // useAuthStore().setClientStorage(null)
      // useAuthStore().setRequestLoanStorage('1')

      // router.push('/')
      throw new HttpError("No está autorizado", 403);
      break;
    }
    case 404:
      throw new HttpError("No se ha encontrado el recurso", 404);
    case 429:
      throw new HttpError(
        "Demasiadas peticiones, espere un momento para intentarlo nuevamente",
        429
      );
    case 500: {
      throw new HttpError(res.response.data.message, 500);
    }

    default:
      break;
  }
});
