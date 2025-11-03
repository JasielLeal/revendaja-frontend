"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ptBR } from "date-fns/locale"
import { format, parseISO } from "date-fns"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface Order {
    createdAt: string
    total: number
}

interface SalesChartProps {
    orders: Order[]
}

export function SalesChart({ orders }: SalesChartProps) {
    // ✅ Agrupa as vendas por dia
    const vendasData = React.useMemo(() => {
        const map = new Map<string, number>()

        for (const order of orders) {
            const date = order.createdAt.split("T")[0] // pega só o YYYY-MM-DD
            const total = (order.total || 0) / 100 // transforma centavos em reais
            map.set(date, (map.get(date) || 0) + total)
        }

        return (
            Array.from(map.entries())
                .map(([date, total]) => ({ date, total }))
                // 🔁 Ordena por data crescente (28 → 29 → 30)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        )
    }, [orders])

    return (
        <Card className="@container/card">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>Vendas Totais</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex justify-center items-center">
                {orders && orders.length > 0 ? (
                    <ChartContainer
                        config={{ vendas: { label: "Vendas", color: "var(--primary)" } }}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={vendasData}>
                            <defs>
                                <linearGradient id="fillVendas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-vendas)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-vendas)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => format(parseISO(value), "dd/MM")}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) =>
                                            format(parseISO(value), "dd 'de' MMMM", { locale: ptBR })
                                        }
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="total"
                                type="natural"
                                fill="url(#fillVendas)"
                                stroke="var(--color-vendas)"
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <div className="flex justify-center items-center h-[250px] w-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 border-t-2 border-t-primary"></div>
                    </div>
                )}
            </CardContent>

        </Card>
    )
}
