"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyDollar,
  IconShoppingCart,
  IconCreditCard,
  IconDeviceFloppy,
  IconReceipt,
  IconDownload,
  IconFilter,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMonthlySummary } from "./hooks/use-financial-data";

// Cores para o gráfico de pizza
const BRAND_COLORS = [
  "#e91e63", // Rosa (Natura)
  "#9c27b0", // Roxo (Boticário)
  "#2196f3", // Azul (Avon)
  "#ff9800", // Laranja (Eudora)
  "#4caf50", // Verde (Outras)
];

// Configuração do gráfico
const chartConfig: ChartConfig = {
  natura: {
    label: "Natura",
    color: BRAND_COLORS[0],
  },
  boticario: {
    label: "Boticário",
    color: BRAND_COLORS[1],
  },
  avon: {
    label: "Avon",
    color: BRAND_COLORS[2],
  },
  eudora: {
    label: "Eudora",
    color: BRAND_COLORS[3],
  },
};

export default function Financial() {
  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = React.useState<string>(String(currentYear));
  const [isLoading, setIsLoading] = React.useState(false);

  // Buscar resumo mensal
  const { data: monthlySummary, isLoading: isMonthlySummaryLoading } =
    useMonthlySummary(Number(dateRange));

  const totalRevenue =
    monthlySummary?.reduce((acc, item) => acc + item.value, 0) ?? 0;

  const monthlyTotals = monthlySummary?.map((month) => {
    const total = month.brands.reduce((acc, brand) => acc + brand.value, 0);

    return {
      month: month.fullLabel,
      total,
    };
  });

  const profit = totalRevenue * 0.3;

  // Agregar marcas de todos os meses
  const brandsTotals = React.useMemo(() => {
    if (!monthlySummary) return [];

    const brandsMap = new Map<string, number>();

    monthlySummary.forEach((month) => {
      month.brands.forEach((brand) => {
        const current = brandsMap.get(brand.name) || 0;
        brandsMap.set(brand.name, current + brand.value);
      });
    });

    return Array.from(brandsMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthlySummary]);

  const totalBrandsRevenue = brandsTotals.reduce((acc, brand) => acc + brand.value, 0);

  // Simular loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dateRange]);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between py-6 px-2 md:px-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Financeiro
          </h1>
          <p className="text-muted-foreground">
            Controle completo das suas finanças
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: currentYear - 2024 }, (_, i) => {
                const year = 2025 + i;
                return (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <IconDownload className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-6 mb-8">
        <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <IconCurrencyDollar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                `R$ ${totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lucro Líquido
            </CardTitle>
            <IconDeviceFloppy className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                `R$ ${profit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              )}
            </div>

          </CardContent>
        </Card>

        <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Marcas Ativas
            </CardTitle>
            <IconCreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {isLoading ? <Skeleton className="h-8 w-16" /> : brandsTotals.length ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Pizza e Informativo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 md:px-6">
        <Card className="lg:col-span-2 shadow-lg rounded-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShoppingCart className="h-5 w-5" />
              Faturamento por Marca
            </CardTitle>
            <CardDescription>Distribuição do faturamento total de {dateRange}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {isMonthlySummaryLoading ? (
              <Skeleton className="h-[300px] w-[300px] rounded-full" />
            ) : brandsTotals.length > 0 && totalBrandsRevenue > 0 ? (
              <ChartContainer
                config={chartConfig}
                className="h-[300px] w-full"
              >
                <PieChart>
                  <Pie
                    data={brandsTotals.map((brand, index) => ({
                      ...brand,
                      fill: BRAND_COLORS[index % BRAND_COLORS.length],
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => {
                      const percentage = ((value / totalBrandsRevenue) * 100).toFixed(1);
                      return `${name} ${percentage}%`;
                    }}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {brandsTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const percentage = ((data.value / totalBrandsRevenue) * 100).toFixed(2);
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-md">
                            <p className="font-semibold text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-600">
                              R$ {data.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-gray-600">{percentage}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Nenhum dado disponível
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informativo */}
        <Card className="shadow-lg rounded-xl border-0">
          <CardHeader>
            <CardTitle className="text-lg">Resumo</CardTitle>
            <CardDescription>Dados do ano selecionado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Faturamento Total</span>
                <span className="text-lg font-bold text-green-600">
                  R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t pt-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lucro Estimado (30%)</span>
                <span className="text-lg font-bold text-blue-600">
                  R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t pt-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Marcas Ativas</span>
                <Badge variant="outline" className="text-primary font-semibold">
                  {brandsTotals.length}
                </Badge>
              </div>
              <div className="border-t pt-2" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Top Marcas</p>
              <div className="space-y-2">
                {brandsTotals.slice(0, 3).map((brand, index) => {
                  const percentage = ((brand.value / totalBrandsRevenue) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}
                        />
                        <span>{brand.name}</span>
                      </div>
                      <span className="font-semibold text-primary">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}
