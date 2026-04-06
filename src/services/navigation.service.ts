import { ApiError } from '@/lib/error/api-error';
import { apiClient } from '@/api';

/* =====================================================
 * TYPES
 * ===================================================== */

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  order: number | null;
  children?: NavigationItem[];
}

/* ---------- ICON SHARE ---------- */

export interface IconShareItem {
  id: number;
  label: string;
  url: string;
  external: boolean;
  icon: string | null;
}

/* =====================================================
 * STRAPI RESPONSE TYPES
 * ===================================================== */

export interface NavigationResponse {
  data: NavigationItem[];
}

interface StrapiMedia {
  url: string;
}

interface StrapiIconShare {
  id: number;
  label: string;
  url: string;
  external: boolean;
  icon?: StrapiMedia | null;
}

interface NavigationEntity {
  id: number;
  type_menu: 'header' | 'footer';
  iconshare: StrapiIconShare[];
}

interface NavigationIconResponse {
  data: NavigationEntity[];
}

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_URL || '';

function buildMediaUrl(url?: string | null) {
  if (!url) return null;

  if (url.startsWith('http')) return url;

  return `${MEDIA_BASE_URL}${url}`;
}

function mapIconShare(items: StrapiIconShare[]): IconShareItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    url: item.url,
    external: item.external,
    icon: buildMediaUrl(item.icon?.url),
  }));
}

/* =====================================================
 * SERVICE
 * ===================================================== */

class NavigationService {
  /* ================= MENU ================= */

  async getHeaderMenu(type: 'header' | 'footer'): Promise<NavigationItem[]> {
    try {
      const response = await apiClient.get<NavigationResponse>('/api/navigation-items', {
        params: {
          'filters[navigation][type_menu][$eq]': type,
          'filters[parent][$null]': true,
          'populate[children][populate]': 'children',
        },
      });

      return response.data.data ?? [];
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async getFooterMenu(): Promise<NavigationItem[]> {
    return this.getHeaderMenu('footer');
  }

  /* ================= ICON / LOGO ================= */

  async getNavigationIcons(type: 'header' | 'footer'): Promise<IconShareItem[]> {
    try {
      const response = await apiClient.get<NavigationIconResponse>('/api/navigations', {
        params: {
          'filters[type_menu][$eq]': type,
          populate: 'iconshare.icon',
        },
      });

      const navigation = response.data.data?.[0];

      if (!navigation) return [];

      return mapIconShare(navigation.iconshare ?? []);
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  getHeaderIcons() {
    return this.getNavigationIcons('header');
  }

  getFooterIcons() {
    return this.getNavigationIcons('footer');
  }
}

export const navigationService = new NavigationService();
