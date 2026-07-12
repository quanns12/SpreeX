export const PERMISSIONS = {
  VIEW_OWN_DASHBOARD: 'view_own_dashboard',
  VIEW_OWN_ORDERS: 'view_own_orders',
  CANCEL_OWN_ORDER: 'cancel_own_order',
  VIEW_ALL_ORDERS: 'view_all_orders',
  UPDATE_ORDER_STATUS: 'update_order_status',
  UPDATE_ORDER_STATUS_FULL: 'update_order_status_full',
  UPDATE_ORDER_STATUS_DELIVERY: 'update_order_status_delivery',
  VIEW_REPORTS: 'view_reports',
  VIEW_ADMIN_PANEL: 'view_admin_panel',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_USERS: 'manage_users',
};

export const ROLE_PERMISSIONS = {
  customer: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.CANCEL_OWN_ORDER,
  ],
  staff: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.UPDATE_ORDER_STATUS_FULL,
  ],
  shipper: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.UPDATE_ORDER_STATUS_DELIVERY,
  ],
  manager: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.VIEW_REPORTS,
  ],
  admin: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.UPDATE_ORDER_STATUS_FULL,
    PERMISSIONS.UPDATE_ORDER_STATUS_DELIVERY,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ADMIN_PANEL,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_USERS,
  ],
};

export const hasPermission = (role, permission) =>
  ROLE_PERMISSIONS[role]?.includes(permission) || false;

export const canAccessAdminArea = (role) =>
  hasPermission(role, PERMISSIONS.VIEW_ADMIN_PANEL) ||
  hasPermission(role, PERMISSIONS.VIEW_REPORTS) ||
  hasPermission(role, PERMISSIONS.VIEW_ALL_ORDERS);

export const getAllowedOrderStatuses = (role) => {
  if (hasPermission(role, PERMISSIONS.UPDATE_ORDER_STATUS_FULL)) {
    return ['pending_payment', 'processing', 'shipping', 'completed', 'cancelled'];
  }

  if (hasPermission(role, PERMISSIONS.UPDATE_ORDER_STATUS_DELIVERY)) {
    return ['shipping', 'completed'];
  }

  return [];
};

export const canUpdateOrderToStatus = (role, status) =>
  getAllowedOrderStatuses(role).includes(status);
