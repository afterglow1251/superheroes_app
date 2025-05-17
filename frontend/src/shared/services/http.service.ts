import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

export class HttpService {
  // prettier-ignore
  constructor(
    private readonly baseUrl: string | undefined = import.meta.env.VITE_BACKEND_URL,
    private readonly apiVersion: string = "api",
    private readonly fetchingService: AxiosInstance = axios.create()
  ) {
    if (!this.baseUrl) {
      throw new Error(
        "Base URL must be provided (process.env.BACKEND_URL is missing)"
      );
    }
  }

  private getFullApiUrl(url?: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url ?? ""}`;
  }

  private extractUrlAndDataFromConfig(
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    const { data, url, ...configWithoutDataAndUrl } = config;
    return configWithoutDataAndUrl;
  }

  public makeRequest<T = any>(
    method: Method,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const url = this.getFullApiUrl(config.url);
    const configWithoutDataAndUrl = this.extractUrlAndDataFromConfig(config);

    return this.fetchingService.request<T>({
      method,
      url,
      data: config.data,
      ...configWithoutDataAndUrl,
    });
  }

  public get<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>("get", config);
  }

  public put<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>("put", config);
  }

  public patch<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>("patch", config);
  }

  public post<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>("post", config);
  }

  public delete<T = any>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>("delete", config);
  }
}
