"use client"

import { useState, useEffect, JSX, cloneElement, isValidElement } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

type FilterType = "preset" | "month" | "custom"
type Preset = "today" | "week" | "month"

interface DateRange {
    from?: string
    to?: string
}

interface DatePickerProps {
    onChange: (range: DateRange | undefined) => void
}

interface PeriodFilterProps {
    onChange: (range: DateRange) => void
    datePickerComponent: React.ReactElement<DatePickerProps>
}

export function PeriodFilter({ onChange, datePickerComponent }: PeriodFilterProps) {
    const [activeTab, setActiveTab] = useState<FilterType>("preset")
    const [preset, setPreset] = useState<Preset>("month")
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
    const [customRange, setCustomRange] = useState<DateRange>({})

    const formatDate = (date: Date) => date.toISOString().split("T")[0]

    function getPresetRange(p: Preset): DateRange {
        const now = new Date()
        switch (p) {
            case "today":
                return { from: formatDate(now), to: formatDate(now) }
            case "week": {
                const first = new Date(now)
                first.setDate(now.getDate() - now.getDay())
                const last = new Date(first)
                last.setDate(first.getDate() + 6)
                return { from: formatDate(first), to: formatDate(last) }
            }
            case "month": {
                const first = new Date(now.getFullYear(), now.getMonth(), 1)
                const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
                return { from: formatDate(first), to: formatDate(last) }
            }
        }
    }

    function getMonthRange(date: Date): DateRange {
        const first = new Date(date.getFullYear(), date.getMonth(), 1)
        const last = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        return { from: formatDate(first), to: formatDate(last) }
    }

    useEffect(() => {
        let range: DateRange
        if (activeTab === "preset") range = getPresetRange(preset)
        else if (activeTab === "month") range = getMonthRange(selectedMonth)
        else range = customRange
        onChange(range)
    }, [activeTab, preset, selectedMonth, customRange])

    return (
        <div className="border border-border rounded-lg p-4 space-y-4 bg-background">
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as FilterType)}>
                <TabsList className="space-x-2">
                    <TabsTrigger value="preset">Pré-definidos</TabsTrigger>
                    <TabsTrigger value="month">Meses</TabsTrigger>
                    <TabsTrigger value="custom">Personalizado</TabsTrigger>
                </TabsList>

                <TabsContent value="preset">
                    <div className="flex gap-2">
                        <Button
                            variant={preset === "today" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPreset("today")}
                        >
                            Hoje
                        </Button>
                        <Button
                            variant={preset === "week" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPreset("week")}
                        >
                            Esta semana
                        </Button>
                        <Button
                            variant={preset === "month" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPreset("month")}
                        >
                            Este mês
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="month">
                    <Input
                        type="month"
                        value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, "0")}`}
                        onChange={(e) => {
                            const [year, month] = e.target.value.split("-").map(Number)
                            setSelectedMonth(new Date(year, month - 1, 1))
                        }}
                    />
                </TabsContent>

                <TabsContent value="custom">
                    {isValidElement(datePickerComponent)
                        ? cloneElement(datePickerComponent, {
                            onChange: (range: DateRange | undefined) => {
                                setCustomRange(range || {})
                            },
                        })
                        : datePickerComponent}
                </TabsContent>
            </Tabs>
        </div>
    )
}
