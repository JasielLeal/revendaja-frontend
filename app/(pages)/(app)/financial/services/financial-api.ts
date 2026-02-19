import { api } from "@/app/backend/axios";
import {
  FinancialDataResponse,
  FinancialFilters,
  MonthlySummary,
} from "../types/financial-types";

export async function fetchFinancialSummary(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>("/financial/summary", {
    params: {
      from: filters.dateRange.from,
      to: filters.dateRange.to,
      transactionType:
        filters.transactionType === "all" ? undefined : filters.transactionType,
      paymentMethod: filters.paymentMethod,
      category: filters.category,
      status: filters.status === "all" ? undefined : filters.status,
    },
  });

  return response.data;
}

export async function fetchFinancialTransactions(
  filters: FinancialFilters,
  page: number = 1,
  limit: number = 10
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/transactions",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
        transactionType:
          filters.transactionType === "all"
            ? undefined
            : filters.transactionType,
        paymentMethod: filters.paymentMethod,
        category: filters.category,
        status: filters.status === "all" ? undefined : filters.status,
        minAmount: filters.minAmount,
        maxAmount: filters.maxAmount,
        page,
        limit,
      },
    }
  );

  return response.data;
}

export async function fetchSalesByBrand(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/sales-by-brand",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
      },
    }
  );

  return response.data;
}

export async function fetchCashFlow(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/cash-flow",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
      },
    }
  );

  return response.data;
}

export async function fetchRevenueByCategory(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/revenue-by-category",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
      },
    }
  );

  return response.data;
}

export async function fetchExpensesByCategory(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/expenses-by-category",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
      },
    }
  );

  return response.data;
}

export async function fetchPaymentMethods(
  filters: FinancialFilters
): Promise<FinancialDataResponse> {
  const response = await api.get<FinancialDataResponse>(
    "/financial/payment-methods",
    {
      params: {
        from: filters.dateRange.from,
        to: filters.dateRange.to,
      },
    }
  );

  return response.data;
}

export async function exportFinancialReport(
  filters: FinancialFilters,
  format: "pdf" | "excel" = "pdf"
): Promise<Blob> {
  const response = await api.get("/financial/export", {
    params: {
      from: filters.dateRange.from,
      to: filters.dateRange.to,
      format,
    },
    responseType: "blob",
  });

  return response.data;
}

export async function fetchMonthlySummary(year: number): Promise<MonthlySummary> {
  const response = await api.get<MonthlySummary>("/dashboard/monthly-summary", {
    params: {
      year,
    },
  });

  return response.data;
}
