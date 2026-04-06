'use client';
import { ApiError } from '@/lib/error/api-error';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const apiError = error instanceof ApiError ? error : null;

  if (apiError?.isNetworkError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">🚧 Hệ thống đang bảo trì</h1>
          <p className="text-gray-500 mt-2">Không thể kết nối tới máy chủ. Vui lòng thử lại sau.</p>
          <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (apiError?.isUnauthorized) {
    return <p>401 – Bạn chưa đăng nhập</p>;
  }

  if (apiError?.isForbidden) {
    return <p>403 – Không có quyền truy cập</p>;
  }

  if (apiError?.isNotFound) {
    return <p>404 – Không tìm thấy dữ liệu</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Đã xảy ra lỗi không xác định</p>
    </div>
  );
}
