// types/dashboard.ts

export interface DashboardItem {
  id: string
  name: string
  quantity: number
  price: number
  storeProductId: string
  createdAt: string
  updatedAt: string
}

export interface DashboardOrder {
  id: string
  orderNumber: string
  status: string
  total: number
  customerName: string
  customerPhone: string
  storeId: string
  createdAt: string
  updatedAt: string
  items: DashboardItem[]
}

export interface DashboardDataTypeResponse {
  totalOrders: number
  totalRevenue: number
  estimatedProfit: number
  orders: DashboardOrder[]
}
