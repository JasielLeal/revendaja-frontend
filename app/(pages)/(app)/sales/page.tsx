"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconTrendingUp } from "@tabler/icons-react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { SaleTable } from "./components/sales-table";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { FetchDashboardDataPagination } from "./services/dashboard-data-pagination";
import { OrdersMetrics } from "./services/orders-metrics";
import { formatCurrency } from "@/lib/format-currency";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sales() {
    const [month, setMonth] = React.useState<string>("");
    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [search, setSearch] = React.useState<string>("");

    // 🔹 Estado separado que será usado após debounce
    const [debouncedSearch, setDebouncedSearch] = React.useState(search);

    // 🔹 Efeito que aplica debounce (500ms)
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // reseta pra página 1 quando pesquisa muda
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    // Utilitário para gerar range do mês
    const getMonthRange = (year: number, monthIndex: number) => {
        const from = new Date(year, monthIndex, 1);
        const to = new Date(year, monthIndex + 1, 0);
        const formatDate = (date: Date) => date.toISOString().split("T")[0];
        return { from: formatDate(from), to: formatDate(to) };
    };

    const dashboardDataSchema = z.object({
        from: z.string(),
        to: z.string(),
    });

    // ✅ Mutation das métricas (cards)
    const dashboardMetricsMutation = useMutation({
        mutationFn: (data: { from: string; to: string }) => {
            const parsed = dashboardDataSchema.parse({
                from: data.from,
                to: data.to,
            });
            return OrdersMetrics(parsed.from, parsed.to);
        },
    });

    // ✅ Mutation da tabela (paginação)
    const dashboardDataPaginationMutation = useMutation({
        mutationFn: (data: {
            from: string;
            to: string;
            page: number;
            limit: number;
            search: string;
        }) => {
            const parsed = dashboardDataSchema.parse({
                from: data.from,
                to: data.to,
            });
            return FetchDashboardDataPagination(
                parsed.from,
                parsed.to,
                data.page,
                data.limit,
                data.search
            );
        },
    });

    // ✅ Função central para buscar tabela
    const fetchTable = (from: string, to: string) => {
        dashboardDataPaginationMutation.mutate({
            from,
            to,
            page,
            limit,
            search: debouncedSearch, // usa o valor já "debounced"
        });
    };

    // ✅ Função central para buscar métricas
    const fetchMetrics = (from: string, to: string) => {
        dashboardMetricsMutation.mutate({ from, to });
    };

    // ✅ Quando mudar o mês → atualiza ambos
    const fetchDataForMonth = (value: string) => {
        setMonth(value);
        const [year, monthStr] = value.split("-");
        const monthIndex = parseInt(monthStr, 10) - 1;
        const range = getMonthRange(parseInt(year, 10), monthIndex);
        fetchTable(range.from, range.to);
        fetchMetrics(range.from, range.to);
    };

    // ✅ Atualiza tabela quando paginação ou busca (debounced) muda
    React.useEffect(() => {
        if (!month) return;
        const [year, monthStr] = month.split("-");
        const monthIndex = parseInt(monthStr, 10) - 1;
        const range = getMonthRange(parseInt(year, 10), monthIndex);
        fetchTable(range.from, range.to);
    }, [page, limit, debouncedSearch]);

    // ✅ Ao montar, busca mês atual
    React.useEffect(() => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        fetchDataForMonth(currentMonth);
    }, []);

    const isLoadingTable = dashboardDataPaginationMutation.isPending;
    const isLoadingMetrics = dashboardMetricsMutation.isPending;

    const dataPagination = dashboardDataPaginationMutation.data;
    const dataMetrics = dashboardMetricsMutation.data;

    const cardData = [
        {
            id: 1,
            name: "Receita total",
            value: dataMetrics ? formatCurrency(dataMetrics.totalRevenue) : null,
            percentage: "+12%",
            context: "Baseado em pedidos pagos",
        },
        {
            id: 2,
            name: "Total de vendas",
            value: dataMetrics ? String(dataMetrics.totalOrders) : null,
            percentage: "+8%",
            context: "Mensalmente",
        },
        {
            id: 3,
            name: "Lucro estimado",
            value: dataMetrics ? formatCurrency(dataMetrics.estimatedProfit) : null,
            percentage: "+10%",
            context: "Com base em 30% de margem de lucro.",
        },
    ];

    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">Vendas</p>
                <Button>
                    Nova venda <Plus />
                </Button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {cardData.map((card) => (
                    <Card key={card.id} className="@container/card">
                        <CardHeader className="flex flex-col gap-2">
                            <CardDescription>{card.name}</CardDescription>
                            <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
                                {isLoadingMetrics ? (
                                    <Skeleton className="h-6 w-[120px]" />
                                ) : (
                                    card.value
                                )}
                            </CardTitle>
                            {isLoadingMetrics ? (
                                <Skeleton className="h-4 w-[60px]" />
                            ) : (
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <IconTrendingUp className="w-4 h-4" />
                                    {card.percentage}
                                </Badge>
                            )}
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            {isLoadingMetrics ? (
                                <Skeleton className="h-4 w-[200px]" />
                            ) : (
                                <div className="line-clamp-1 flex gap-2 items-center">
                                    {card.context} <IconTrendingUp className="w-4 h-4" />
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 my-5">
                <Input
                    placeholder="Buscar por cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paid">Pagas</SelectItem>
                        <SelectItem value="pending">Pendentes</SelectItem>
                        <SelectItem value="canceled">Canceladas</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={month} onValueChange={fetchDataForMonth}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => {
                            const monthNumber = (i + 1).toString().padStart(2, "0");
                            const year = new Date().getFullYear();
                            return (
                                <SelectItem key={i} value={`${year}-${monthNumber}`}>
                                    {new Date(year, i).toLocaleString("pt-BR", { month: "long" })}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Tabela */}
                {isLoadingTable ? (
                    <div className="space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                ) : (
                    <SaleTable
                        sales={
                            dataPagination?.orders.map((order) => ({
                                id: order.orderNumber,
                                customerName: order.customerName,
                                createdAt: order.createdAt,
                                total: order.total,
                                profit: Math.floor(order.total * 0.3),
                                status: order.status,
                            })) || []
                        }
                    />
                )}

                {/* Paginação */}
                <div className="flex justify-between items-center mt-6 mb-4">
                    {isLoadingTable ? (
                        <Skeleton className="h-10 w-full" />
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
                                </Button>
                                <span className="text-sm">Página {page}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={dataPagination && dataPagination.orders.length < limit}
                                >
                                    Próxima <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>

                            <Select
                                value={String(limit)}
                                onValueChange={(v) => {
                                    setLimit(Number(v));
                                    setPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Limite" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
