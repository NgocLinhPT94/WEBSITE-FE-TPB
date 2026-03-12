import { apiClient } from '@/api';
import { env } from '@/lib/config';

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
  };
  author?: {
    name: string;
  };
  locale: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface ListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiResponse<T> {
  data: T;
}

class PageService {
  async getPages(locale?: string, populate?: string): Promise<Page[]> {
    const params: Record<string, string> = {};
    if (locale) params.locale = locale;
    if (populate) params.populate = populate;

    const response = await apiClient.get<{ data: Page[] }>(
      `${env.apiUrl}/api/pages`,
      { params }
    );
    return response.data.data;
  }

  async getPage(id: number, locale?: string, populate?: string): Promise<Page> {
    const params: Record<string, string> = {};
    if (locale) params.locale = locale;
    if (populate) params.populate = populate;

    const response = await apiClient.get<{ data: Page }>(
      `${env.apiUrl}/api/pages/${id}`,
      { params }
    );
    return response.data.data;
  }

  async getPageBySlug(slug: string, locale?: string): Promise<Page | null> {
    const params: Record<string, string> = {
      'filters[slug][$eq]': slug,
    };
    if (locale) params.locale = locale;

    const response = await apiClient.get<{ data: Page[] }>(
      `${env.apiUrl}/api/pages`,
      { params }
    );
    return response.data.data[0] ?? null;
  }
}

class BlogPostService {
  async getBlogPosts(
    locale?: string,
    params?: PaginationParams
  ): Promise<ListResponse<BlogPost>> {
    const queryParams: Record<string, string | number> = {};
    if (locale) queryParams.locale = locale;
    if (params?.page) queryParams['pagination[page]'] = params.page;
    if (params?.pageSize) queryParams['pagination[pageSize]'] = params.pageSize;
    if (params?.sort) queryParams.sort = params.sort;
    queryParams.populate = '*';

    const response = await apiClient.get<ListResponse<BlogPost>>(
      `${env.apiUrl}/api/blog-posts`,
      { params: queryParams }
    );
    return response.data;
  }

  async getBlogPost(
    id: number,
    locale?: string,
    populate?: string
  ): Promise<BlogPost> {
    const params: Record<string, string> = {};
    if (locale) params.locale = locale;
    if (populate) params.populate = populate;

    const response = await apiClient.get<{ data: BlogPost }>(
      `${env.apiUrl}/api/blog-posts/${id}`,
      { params }
    );
    return response.data.data;
  }

  async getBlogPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
    const params: Record<string, string> = {
      'filters[slug][$eq]': slug,
      populate: '*',
    };
    if (locale) params.locale = locale;

    const response = await apiClient.get<{ data: BlogPost[] }>(
      `${env.apiUrl}/api/blog-posts`,
      { params }
    );
    return response.data.data[0] ?? null;
  }
}

export const pageService = new PageService();
export const blogPostService = new BlogPostService();
