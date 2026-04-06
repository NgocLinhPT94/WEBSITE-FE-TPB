export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  static fromAxiosError(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: {
          status: number;
          data?: { message?: string; error?: { message?: string } };
        };
        message?: string;
      };
      const statusCode = axiosError.response?.status ?? 500;
      const message =
        axiosError.response?.data?.message ??
        axiosError.response?.data?.error?.message ??
        axiosError.message ??
        'An unexpected error occurred';
      return new ApiError(message, statusCode);
    }
    return new ApiError('Network error', 0);
  }

  get isNetworkError(): boolean {
    // backend down / ECONNREFUSED / timeout
    return this.statusCode === 0;
  }

  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
