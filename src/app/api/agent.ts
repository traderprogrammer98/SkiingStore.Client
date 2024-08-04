import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = "https://localhost:7190/api/"

const responseBody = (response: AxiosResponse) => response.data

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

const agent = {
  Catelog,
}

export default agent
