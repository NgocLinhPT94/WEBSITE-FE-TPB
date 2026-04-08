/* ============================================
   Validation Helpers - Hàm validate dùng chung
   ============================================ */

/**
 * Kiểm tra email hợp lệ
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Kiểm tra số điện thoại Việt Nam
 */
export function isValidPhoneVN(phone: string): boolean {
  const regex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

/**
 * Kiểm tra CMND/CCCD
 */
export function isValidCitizenId(id: string): boolean {
  const cleaned = id.replace(/\s/g, '');
  return /^\d{9}$/.test(cleaned) || /^\d{12}$/.test(cleaned);
}

/**
 * Kiểm tra mã số thuế
 */
export function isValidTaxCode(code: string): boolean {
  const cleaned = code.replace(/[-\s]/g, '');
  return /^\d{10}$/.test(cleaned) || /^\d{13}$/.test(cleaned);
}

/**
 * Kiểm tra URL hợp lệ
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Kiểm tra password mạnh
 * - Ít nhất 8 ký tự
 * - Có chữ hoa, chữ thường, số, ký tự đặc biệt
 */
export function isStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Tối thiểu 8 ký tự');
  if (!/[A-Z]/.test(password)) errors.push('Cần có chữ hoa');
  if (!/[a-z]/.test(password)) errors.push('Cần có chữ thường');
  if (!/\d/.test(password)) errors.push('Cần có số');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Cần có ký tự đặc biệt');
  return { isValid: errors.length === 0, errors };
}

/**
 * Kiểm tra chuỗi rỗng hoặc chỉ có khoảng trắng
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}
