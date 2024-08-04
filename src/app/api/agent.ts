import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

axios.defaults.baseURL = "https://localhost:7190/api/"

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    console.log(error.response)
    const { data, status } = error.response as AxiosResponse
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = []
          for (const key in data.errors) {
            modelStateErrors.push(data.errors[key])
          }
          throw modelStateErrors.flat()
        }
        toast.error(data.title)
        break
      case 401:
        toast.error(data.title)
        break
      case 500:
        toast.error(data.title)
        break
      default:
        toast.error(data.title)
        break
    }
    return Promise.reject(error.response)
  }
)

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  delete: (url: string) => axios.get(url).then(responseBody),
}

const Catelog = {
  list: () => request.get("Products"),
  details: (id: number) => request.get(`Products/${id}`),
}

const TestErrors = {
  get400Error: () => request.get("Buggy/bad-request"),
  get401Error: () => request.get("Buggy/unauthorized"),
  get404Error: () => request.get("Buggy/not-found"),
  get500Error: () => request.get("Buggy/server-error"),
  getvalidationError: () => request.get("Buggy/validation-error"),
}

const agent = {
  Catelog,
  TestErrors,
}

export default agent
