import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '@/lib/config';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  token?: string;
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /* ========= REQUEST INTERCEPTOR ========= */
  client.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      // Inject Bearer Token automatically
      if (config.token) {
        request.headers.Authorization = `Bearer ${config.token}`;
      }

      const locale = request.headers['X-Locale'];
      if (locale) delete request.headers['X-Locale'];

      return request;
    },
    (error) => Promise.reject(error)
  );

  /* ========= RESPONSE INTERCEPTOR ========= */
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => Promise.reject(error)
  );

  return client;
}

/* ========= DEFAULT API CLIENT ========= */

export const apiClient = createApiClient({
  baseURL: env.apiUrl,
  token: env.strapiApiToken,
});

export default apiClient;
