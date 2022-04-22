import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { API_URL } from "./http";
import { List } from "../types/appoints";

export enum Methods {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Method = keyof typeof Methods;

export default class AuthService {
  static token: string | any = localStorage.getItem("accessToken");
  static refreshToken: string | any = localStorage.getItem("refreshToken");

  static setToken() {
    this.token = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  static makeRequest = (method: Method, url: string, data?: any) => {
    this.setToken();
    const headers: AxiosRequestHeaders = {};
    if (this.token) headers.accessToken = this.token;
    if (this.refreshToken) headers.refreshToken = this.refreshToken;

    return axios({
      method,
      headers,
      url,
      data,
    })
      .then((result: AxiosResponse) => {
        return result;
      })
      .catch(async (error: any) => {
        if (error.response.status === 401) {
          await this.refresh();
          await this.makeRequest(method, url, data);
        } else {
          return error.response.status;
        }
      });
  };

  static post(url: string, body?: any) {
    return this.makeRequest(Methods.POST, `${API_URL}/${url}`, body);
  }
  static get(url: string) {
    return this.makeRequest(Methods.GET, `${API_URL}/${url}`);
  }

  static patch(url: string, body: List) {
    return this.makeRequest(Methods.PATCH, `${API_URL}/${url}`, body);
  }

  static del(url: string, id: string) {
    return this.makeRequest(Methods.DELETE, `${API_URL}/${url}`, {
      _id: id,
    });
  }

  static async refresh() {
    const newTokens: AxiosResponse = await axios.get(`${API_URL}/refresh`, {
      headers: {
        accessToken: this.token,
        refreshToken: this.refreshToken,
      },
    });
    await localStorage.setItem("accessToken", newTokens.data.accessToken);
    await localStorage.setItem("refreshToken", newTokens.data.refreshToken);
    this.setToken();
  }
}
