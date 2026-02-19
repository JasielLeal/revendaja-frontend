// Tipos para os dados financeiros

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  periodGrowth: number;
  totalTransactions: number;
  transactionGrowth: number;
}

export interface RevenueByCategory {
  category: string;
  amount: number;
  percentage: number;
  growth?: number; // Crescimento em relação ao período anterior
}

export interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  subcategories?: {
    name: string;
    amount: number;
  }[];
}

export interface CashFlowData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  date: string; // YYYY-MM formato
}

export interface SalesByBrand {
  brand: string;
  amount: number;
  quantity: number;
  percentage: number;
  averagePrice: number;
}

export interface Transaction {
  id: number;
  type: "revenue" | "expense";
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD formato
  method: string;
  status: "completed" | "pending" | "cancelled";
  category?: string;
  orderId?: number; // Se for relacionado a uma venda
  reference?: string; // Número de referência/comprovante
}

export interface PaymentMethod {
  method: string;
  amount: number;
  count: number;
  percentage: number;
  averageTicket: number; // Ticket médio
}

export interface FinancialMetrics {
  // Métricas de performance
  averageTicket: number;
  conversionRate: number;
  customerLifetimeValue: number;
  returnOnInvestment: number;

  // Métricas de crescimento
  monthlyGrowthRate: number;
  yearOverYearGrowth: number;

  // Métricas de eficiência
  costOfGoodsSold: number; // Custo dos produtos vendidos
  operatingExpenseRatio: number; // Percentual de despesas operacionais
  netProfitMargin: number;
  grossProfitMargin: number;
}

export interface FinancialGoals {
  // Metas financeiras
  monthlyRevenueTarget: number;
  monthlyProfitTarget: number;
  yearlyRevenueTarget: number;
  yearlyProfitTarget: number;

  // Progress atual
  monthlyRevenueProgress: number; // Percentual alcançado
  monthlyProfitProgress: number;
  yearlyRevenueProgress: number;
  yearlyProfitProgress: number;
}

export interface FinancialData {
  summary: FinancialSummary;
  revenueByCategory: RevenueByCategory[];
  expensesByCategory: ExpenseByCategory[];
  salesByBrand: SalesByBrand[];
  recentTransactions: Transaction[];
  paymentMethods: PaymentMethod[];
  metrics: FinancialMetrics;
  goals: FinancialGoals;
}

// Filtros para consultas
export interface FinancialFilters {
  dateRange: {
    from: string; // YYYY-MM-DD
    to: string; // YYYY-MM-DD
  };
  transactionType?: "revenue" | "expense" | "all";
  paymentMethod?: string;
  category?: string;
  status?: "completed" | "pending" | "cancelled" | "all";
  minAmount?: number;
  maxAmount?: number;
}

// Request/Response para APIs
export interface FinancialDataRequest {
  filters: FinancialFilters;
  page?: number;
  limit?: number;
}

export interface FinancialDataResponse {
  data: FinancialData;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MonthlySummaryBrand {
  name: string;
  value: number;
}

export interface MonthlySummaryMonth {
  label: string;
  fullLabel: string;
  value: number;
  brands: MonthlySummaryBrand[];
}

export type MonthlySummary = MonthlySummaryMonth[];