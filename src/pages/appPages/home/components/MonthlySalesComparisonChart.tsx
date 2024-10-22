import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MonthlySalesComparisonChart() {

    const chartData = [
        { month: "Jan", desktop: 186 },
        { month: "Fev", desktop: 305 },
        { month: "Mar", desktop: 237 },
        { month: "Abr", desktop: 73 },
        { month: "Mai", desktop: 209 },
        { month: "Jun", desktop: 214 },
        { month: "Jul", desktop: 214 },
        { month: "Ago", desktop: 214 },
        { month: "Set", desktop: 214 },
        { month: "Out", desktop: 214 },
        { month: "Nov", desktop: 214 },
        { month: "Dez", desktop: 214 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#f97316",
        },
    } satisfies ChartConfig


    return (
        <>
            <Card>
                <CardContent >
                    <CardHeader>
                        <CardTitle>Lucro Mensal</CardTitle>
                        <CardDescription>Ganhos mensais a partir de cada mês</CardDescription>
                    </CardHeader>
                    <ChartContainer config={chartConfig} className="w-full h-[200px]">
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} />
                            <CartesianGrid vertical={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}