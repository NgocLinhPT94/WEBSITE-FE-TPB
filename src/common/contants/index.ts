/* ============================================
   Constants - Hằng số dùng chung toàn project
   ============================================ */

// === Breakpoints (khớp với Tailwind) ===
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// === Pagination ===
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// === Date/Time Formats ===
export const DATE_FORMAT = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_TIME: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// === HTTP Status Codes ===
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

// === Storage Keys ===
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  LOCALE: 'preferred_locale',
  THEME: 'preferred_theme',
} as const;

// === Query Keys (TanStack Query) ===
export const QUERY_KEYS = {
  PAGES: 'pages',
  BLOG_POSTS: 'blog-posts',
  BLOG_POST: 'blog-post',
  MENUS: 'menus',
  SETTINGS: 'settings',
} as const;

// === Routes ===
export const ROUTES = {
  //DEFINE lại
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: {
    PERSONAL: '/products/personal',
    BUSINESS: '/products/business',
    SAVINGS: '/products/savings',
    CREDIT_CARD: '/products/credit-card',
    LOAN: '/products/loan',
    INVESTMENT: '/products/investment',
  },
  SERVICES: {
    ONLINE_BANKING: '/services/online-banking',
    MOBILE_APP: '/services/mobile-app',
    INSURANCE: '/services/insurance',
    SUPPORT: '/services/support',
  },
  UTILITIES: {
    BRANCH_ATM: '/utilities/branch-atm',
  },
  LEGAL: {
    TERMS: '/terms',
    PRIVACY: '/privacy',
  },
} as const;

// === Social Links ===
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com',
  YOUTUBE: 'https://youtube.com',
  LINKEDIN: 'https://linkedin.com',
  INSTAGRAM: 'https://instagram.com',
} as const;

// === Company Info ===
export const COMPANY = {
  NAME: 'Enterprise',
  HOTLINE: '1900 xxxx',
  EMAIL: 'contact@enterprise.com',
} as const;
