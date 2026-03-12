import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '@/lib/config';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const locale = config.headers['X-Locale'] as string | undefined;
      if (locale) {
        delete config.headers['X-Locale'];
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 500:
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createApiClient({
  baseURL: env.apiUrl,
});

export default apiClient;
