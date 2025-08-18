export const ORDER_STATUS = {
  ALL: "Tất cả",
  PENDING: "Đã đặt, chờ duyệt",
  APPROVED: "Đã duyệt",
  SHIPPING: "Đang giao hàng",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
} as const;

export const ORDER_STATUS_OPTIONS = Object.keys(ORDER_STATUS).map((key) => ({
  label: ORDER_STATUS[key as keyof typeof ORDER_STATUS],
  value: key,
}));

export const ORDER_STATUSES = Object.values(ORDER_STATUS);

export const ORDER_STATUS_KEYS = Object.keys(
  ORDER_STATUS
) as (keyof typeof ORDER_STATUS)[];

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
