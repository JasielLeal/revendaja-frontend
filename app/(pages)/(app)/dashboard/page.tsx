"use client"

import { useUser } from "@/app/context/user-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IconTrendingUp } from "@tabler/icons-react"
import { NewSale } from "../sales/components/new-sale"
import { SalesChart } from "./components/sales-chart"
import { DateSelector } from "./components/date-selector"
import { useEffect, useState } from "react"
import { PeriodFilterButton } from "./components/period-button"
import { useMutation } from "@tanstack/react-query"
import z from "zod"
import { FetchDashboardData } from "./services/dashboard-data"
import { startOfMonth, endOfMonth } from "date-fns"
import { formatCurrency } from "@/lib/format-currency"
import { formatLocalDate } from "@/lib/format-date"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
    const { user, isLoading } = useUser()

    // 🔹 Estado principal do range de datas
    const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
        from: formatLocalDate(startOfMonth(new Date())),
        to: formatLocalDate(endOfMonth(new Date())),
    })

    const dashboardDataSchema = z.object({
        from: z.string(),
        to: z.string(),
    })

    type DashboardData = z.infer<typeof dashboardDataSchema>

    // 🔹 Mutation para buscar os dados
    const dashboardDataMutation = useMutation({
        mutationFn: (data: DashboardData) => {
            const parsed = dashboardDataSchema.parse(data)
            return FetchDashboardData(parsed.from, parsed.to)
        },
        onSuccess: () => {

        },
        onError: (err) => {
            console.error("❌ Erro ao buscar dados do dashboard:", err)
        },
    })

    // expose stable mutate fn for effect deps
    const { mutate } = dashboardDataMutation

    // 🔹 Requisição inicial e quando o range mudar
    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            const from = dateRange.from
            const to = dateRange.to

            mutate({ from, to })
        }
    }, [dateRange.from, dateRange.to, mutate]) // <- dispara quando o range mudar ou no início

    const cardData = [
        {
            id: 1,
            name: "Receita total",
            value: dashboardDataMutation.data
                ? formatCurrency(dashboardDataMutation.data.totalRevenue)
                : undefined,
            percentage: "+12%",
            context: "Baseado em pedidos pagos",
        },
        {
            id: 2,
            name: "Total de vendas",
            value: dashboardDataMutation.data
                ? String(dashboardDataMutation.data.totalOrders)
                : undefined,
            percentage: "+12%",
            context: "quantidade de pedidos realizados",
        },
        {
            id: 3,
            name: "Lucro estimado",
            value: dashboardDataMutation.data
                ? formatCurrency(dashboardDataMutation.data.estimatedProfit)
                : undefined,
            percentage: "+12%",
            context: "Com base em 30% de margem de lucro.",
        },
    ]

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <Skeleton className="h-7 w-[260px]" />
                    ) : (
                        <div>
                            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Olá, <span className="text-primary">{user?.name}</span></p>
                            <p className="text-sm text-muted-foreground">Resumo das métricas do período selecionado</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <PeriodFilterButton
                        datePickerComponent={<DateSelector onChange={() => { }} />}
                        onChange={(range) => setDateRange(range)}
                    />

                    <div className="hidden sm:block">
                        <NewSale />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cardData.map((card) => (
                    <Card key={card.id} className="bg-card border border-muted/20 shadow-sm rounded-xl overflow-hidden">
                        <CardHeader className="flex flex-col gap-1 p-4">
                            <CardDescription className="text-sm font-medium text-muted-foreground">{card.name}</CardDescription>
                            <CardTitle className="text-2xl font-bold text-foreground">
                                {card.value ?? <Skeleton className="h-6 w-32" />}
                            </CardTitle>
                            <div className="mt-2">
                                <Badge variant="outline" className="px-2 py-1 text-xs bg-muted/10 text-muted-foreground inline-flex items-center gap-1">
                                    <IconTrendingUp className="w-4 h-4" /> {card.percentage}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">{card.context}</CardFooter>
                    </Card>
                ))}
            </div>

            <div>
                <Card className="bg-card border border-muted/20 shadow-sm rounded-xl">
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg font-semibold">Vendas por dia</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Visualização do total de pedidos por dia no período</CardDescription>
                    </CardHeader>
                    <div className="p-4 pt-0">
                        <SalesChart orders={dashboardDataMutation.data?.orders ?? []} />
                    </div>
                </Card>
            </div>
        </div>
    )
}
