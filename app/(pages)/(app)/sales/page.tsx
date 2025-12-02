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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SaleTable } from "./components/sales-table";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import { FetchDashboardDataPagination } from "./services/dashboard-data-pagination";
import { OrdersMetrics } from "./services/orders-metrics";
import { DashboardDataTypeResponse } from "./types/dashboard-data-type";
import { formatCurrency } from "@/lib/format-currency";
import { Skeleton } from "@/components/ui/skeleton";
import { NewSale } from "./components/new-sale";

export default function Sales() {
    const [month, setMonth] = React.useState<string>("");
    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [search, setSearch] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("all");

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

    // 🔹 Reset da página quando status muda
    React.useEffect(() => {
        setPage(1);
    }, [status]);

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

    // Mantém o range atual (from/to) para passar para as queries
    const [range, setRange] = React.useState<{ from: string; to: string } | null>(null);

    // ✅ Query das métricas (cards) — usa useQuery para que invalidateQueries funcione
    const dashboardMetricsQuery = useQuery<DashboardDataTypeResponse, Error>({
        queryKey: ["show-orders-metrics", range?.from, range?.to],
        queryFn: async () => {
            if (!range) throw new Error("Range não definido");
            const parsed = dashboardDataSchema.parse({ from: range.from, to: range.to });
            return OrdersMetrics(parsed.from, parsed.to);
        },
        enabled: !!range,
    });

    // ✅ Query da tabela (paginação) — também usa useQuery com chave que inclui paginação e busca
    const dashboardDataPaginationQuery = useQuery<DashboardDataTypeResponse, Error>({
        queryKey: ["show-orders", range?.from, range?.to, page, limit, debouncedSearch, status],
        queryFn: async () => {
            if (!range) throw new Error("Range não definido");
            const parsed = dashboardDataSchema.parse({ from: range.from, to: range.to });
            return FetchDashboardDataPagination(
                parsed.from,
                parsed.to,
                page,
                limit,
                debouncedSearch,
                status === "all" ? undefined : status // Se for "all", não enviar status
            );
        },
        enabled: !!range,
    });

    // ✅ Função central para buscar tabela e métricas: atualiza o range (as queries observam range e re-executam)
    const fetchTable = (from: string, to: string) => {
        setRange({ from, to });
    };

    const fetchMetrics = (from: string, to: string) => {
        setRange({ from, to });
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

    // ✅ Atualiza tabela quando paginação, busca (debounced) ou status muda
    React.useEffect(() => {
        if (!month) return;
        const [year, monthStr] = month.split("-");
        const monthIndex = parseInt(monthStr, 10) - 1;
        const range = getMonthRange(parseInt(year, 10), monthIndex);
        fetchTable(range.from, range.to);
    }, [page, limit, debouncedSearch, status, month]);

    // ✅ Ao montar, busca mês atual
    React.useEffect(() => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        // define initial month and range directly (avoid extra deps)
        setMonth(currentMonth);
        const [year, monthStr] = currentMonth.split("-");
        const monthIndex = parseInt(monthStr, 10) - 1;
        const initialRange = getMonthRange(parseInt(year, 10), monthIndex);
        setRange(initialRange);
    }, []);

    const isLoadingTable = dashboardDataPaginationQuery.isFetching || dashboardDataPaginationQuery.isLoading;
    const isLoadingMetrics = dashboardMetricsQuery.isFetching || dashboardMetricsQuery.isLoading;

    const dataPagination = dashboardDataPaginationQuery.data;
    const dataMetrics = dashboardMetricsQuery.data;

    const metricsData = dataMetrics as DashboardDataTypeResponse | undefined;

    const dataPag = dataPagination as DashboardDataTypeResponse | undefined;

    console.log("datapag", dataPag)

    const cardData = [
        {
            id: 1,
            name: "Receita total",
            value: metricsData ? formatCurrency(metricsData.totalRevenue) : null,
            percentage: "+12%",
            context: "Baseado em pedidos pagos",
        },
        {
            id: 2,
            name: "Total de vendas",
            value: metricsData ? String(metricsData.totalOrders) : null,
            percentage: "+8%",
            context: "Contagem total de pedidos no mês selecionado.",
        },
        {
            id: 3,
            name: "Lucro estimado",
            value: metricsData ? formatCurrency(metricsData.estimatedProfit) : null,
            percentage: "+10%",
            context: "Com base em 30% de margem de lucro.",
        },
    ];

    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="min-h-screen flex flex-col bg-background pb-8">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between py-6 px-2 md:px-6">
                <h1 className="text-3xl font-extrabold tracking-tight text-primary ">Vendas</h1>
                <NewSale />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 px-2 md:px-6">
                {cardData.map((card) => (
                    <Card key={card.id} className={`relative overflow-hidden shadow-lg rounded-xl border-0 animate-in fade-in duration-500 bg-card`}>
                        <CardHeader className="flex flex-col gap-2 pb-2">
                            <CardDescription className="text-sm font-semibold text-muted-foreground">{card.name}</CardDescription>
                            <CardTitle className="text-3xl font-extrabold tabular-nums text-primary">
                                {isLoadingMetrics ? (
                                    <Skeleton className="h-8 w-[120px]" />
                                ) : (
                                    card.value
                                )}
                            </CardTitle>
                            {isLoadingMetrics ? (
                                <Skeleton className="h-4 w-[60px]" />
                            ) : (
                                <Badge variant="outline" className="flex items-center gap-1 text-xs px-2 py-1 bg-muted/40 border-none">
                                    <IconTrendingUp className="w-4 h-4 text-green-600" />
                                    {card.percentage}
                                </Badge>
                            )}
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-xs text-muted-foreground pb-3">
                            {isLoadingMetrics ? (
                                <Skeleton className="h-4 w-[200px]" />
                            ) : (
                                <div className="line-clamp-1 flex gap-2 items-center">
                                    {card.context} <IconTrendingUp className="w-4 h-4 text-muted-foreground" />
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Filtros */}
            <div className="flex items-center justify-between py-6 px-2 md:px-6">
                <div className="flex items-center gap-6 bg-muted rounded-3xl p-4 w-full">
                    <Input
                        placeholder="Buscar por cliente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs shadow-sm bg-background text-foreground border border-input placeholder:text-muted-foreground h-10"
                    />

                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px] shadow-sm rounded-lg bg-background text-foreground border border-input h-10 flex items-center">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-foreground">
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="approved">Pagas</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={month} onValueChange={fetchDataForMonth}>
                        <SelectTrigger className="w-[180px] shadow-sm rounded-lg bg-background text-foreground border border-input h-10 flex items-center">
                            <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-foreground">
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
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col justify-between px-2 md:px-6">
                {/* Tabela */}
                <div className="bg-card rounded-xl shadow-lg border border-muted/30 p-2 md:p-4">
                    {isLoadingTable ? (
                        <div className="space-y-2 animate-pulse">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : (
                        <SaleTable
                            sales={
                                dataPag?.orders.map((order) => ({
                                    id: order.id,
                                    orderNumber: order.orderNumber,
                                    customerName: order.customerName,
                                    createdAt: order.createdAt,
                                    total: order.total,
                                    profit: Math.floor(order.total * 0.3),
                                    status: order.status,
                                    products: order.items.map((item) => ({
                                        id: item.id,
                                        name: item.name,
                                        image: item.imgUrl,
                                        quantity: item.quantity,
                                        price: item.price,
                                    })),
                                })) || []
                            }
                        />
                    )}
                </div>

                {/* Paginação */}
                <div className="flex flex-wrap justify-between items-center mt-6 mb-4 gap-4">
                    {isLoadingTable ? (
                        <Skeleton className="h-10 w-full rounded-lg" />
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className="rounded-lg shadow-sm"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
                                </Button>
                                <span className="text-sm font-semibold">Página {page}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={dataPag && dataPag.orders.length < limit}
                                    className="rounded-lg shadow-sm"
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
                                <SelectTrigger className="w-[100px] shadow-sm rounded-lg h-10 flex items-center">
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
