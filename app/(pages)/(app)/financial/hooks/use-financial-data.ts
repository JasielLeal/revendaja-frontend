"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchFinancialSummary,
  fetchFinancialTransactions,
  fetchSalesByBrand,
  fetchCashFlow,
  fetchRevenueByCategory,
  fetchExpensesByCategory,
  fetchPaymentMethods,
  fetchMonthlySummary,
} from "../services/financial-api";
import { FinancialFilters } from "../types/financial-types";

export function useFinancialSummary(filters: FinancialFilters) {
  return useQuery({
    queryKey: [
      "financial-summary",
      filters.dateRange.from,
      filters.dateRange.to,
      filters.transactionType,
      filters.status,
    ],
    queryFn: () => fetchFinancialSummary(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useFinancialTransactions(
  filters: FinancialFilters,
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: [
      "financial-transactions",
      filters.dateRange.from,
      filters.dateRange.to,
      filters.transactionType,
      filters.paymentMethod,
      filters.category,
      filters.status,
      filters.minAmount,
      filters.maxAmount,
      page,
      limit,
    ],
    queryFn: () => fetchFinancialTransactions(filters, page, limit),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}

export function useSalesByBrand(filters: FinancialFilters) {
  return useQuery({
    queryKey: ["sales-by-brand", filters.dateRange.from, filters.dateRange.to],
    queryFn: () => fetchSalesByBrand(filters),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}

export function useCashFlow(filters: FinancialFilters) {
  return useQuery({
    queryKey: ["cash-flow", filters.dateRange.from, filters.dateRange.to],
    queryFn: () => fetchCashFlow(filters),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}

export function useRevenueByCategory(filters: FinancialFilters) {
  return useQuery({
    queryKey: [
      "revenue-by-category",
      filters.dateRange.from,
      filters.dateRange.to,
    ],
    queryFn: () => fetchRevenueByCategory(filters),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}

export function useExpensesByCategory(filters: FinancialFilters) {
  return useQuery({
    queryKey: [
      "expenses-by-category",
      filters.dateRange.from,
      filters.dateRange.to,
    ],
    queryFn: () => fetchExpensesByCategory(filters),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}

export function usePaymentMethods(filters: FinancialFilters) {
  return useQuery({
    queryKey: ["payment-methods", filters.dateRange.from, filters.dateRange.to],
    queryFn: () => fetchPaymentMethods(filters),
    staleTime: 1000 * 60 * 15, // 15 minutos
  });
}

export function useMonthlySummary(year: number) {
  return useQuery({
    queryKey: ["monthly-summary", year],
    queryFn: () => fetchMonthlySummary(year),
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
}
