import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "https://localhost:7190/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    console.log(error.response);
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            modelStateErrors.push(data.errors[key]);
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        router.navigate("/not-found", { state: { error: data } });
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        toast.error(data.title);
        break;
    }
    return Promise.reject(error.response);
  }
);

const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catelog = {
  list: (params: URLSearchParams) => request.get("Products", params),
  details: (id: number) => request.get(`Products/${id}`),
  fetchFilters: () => request.get("Products/filters"),
};

const Account = {
  login: (values: any) => request.post("Account/Login", values),
  register: (values: any) => request.post("Account/Register", values),
  currentUser: () => request.get("Account/CurrentUser"),
  fetchAddress: () => request.get("Account/SavedAddress"),
};

const TestErrors = {
  get400Error: () => request.get("Buggy/bad-request"),
  get401Error: () => request.get("Buggy/unauthorized"),
  get404Error: () => request.get("Buggy/not-found"),
  get500Error: () => request.get("Buggy/server-error"),
  getvalidationError: () => request.get("Buggy/validation-error"),
};

const Basket = {
  get: () => request.get("Basket"),
  addItem: (productId: number, quantity = 1) =>
    request.post(`Basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`Basket?productId=${productId}&quantity=${quantity}`),
};

const Order = {
  list: () => request.get("Order"),
  fetch: (id: number) => request.get(`Order/${id}`),
  create: (values: any) => request.post("Order", values),
};

const agent = {
  Catelog,
  TestErrors,
  Basket,
  Account,
  Order,
};

export default agent;
