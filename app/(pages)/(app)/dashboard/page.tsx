"use client"

import { useUser } from "@/app/context/user-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IconTrendingUp } from "@tabler/icons-react"
import { Plus } from "lucide-react"
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
            context: "Visíveis na sua loja online",
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
        <>
            <div className="sm:flex sm:justify-between sm:items-center">
                {
                    isLoading ?
                        <Skeleton className="h-5 w-[250px]" />
                        :
                        <p className="text-xl font-semibold tracking-tighter">
                            Olá, <span>{user?.name}</span>
                        </p>
                }

                <div className="flex items-center gap-2">
                    {/* 🔹 Filtro de período controlado */}
                    <PeriodFilterButton
                        datePickerComponent={<DateSelector onChange={() => { }} />}
                        onChange={(range) => setDateRange(range)}
                    />

                    <Button className="hidden sm:flex">
                        Nova venda <Plus />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {cardData.map((card) => (
                    <Card key={card.id} className="@container/card">
                        <CardHeader className="flex flex-col gap-2">
                            <CardDescription>{card.name}</CardDescription>
                            <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
                                {card.value ? (
                                    card.value
                                ) : (
                                    <Skeleton className="h-5 w-[250px]" />
                                )}
                            </CardTitle>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <IconTrendingUp className="w-4 h-4" />
                                {card.percentage}
                            </Badge>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 items-center">
                                {card.context} <IconTrendingUp className="w-4 h-4" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>



            <div className="mt-5">
                <SalesChart orders={dashboardDataMutation.data?.orders ?? []} />
            </div>
        </>
    )
}
