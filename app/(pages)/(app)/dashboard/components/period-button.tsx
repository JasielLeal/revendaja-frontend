"use client"

import { JSX, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { PeriodFilter } from "./period-date"

interface DateRange {
    from?: string
    to?: string
}

interface PeriodFilterButtonProps {
    datePickerComponent: JSX.Element
    onChange?: (range: DateRange) => void // ← adicionamos isso
}

export function PeriodFilterButton({ datePickerComponent, onChange }: PeriodFilterButtonProps) {
    const [dateRange, setDateRange] = useState<DateRange>({})
    const [open, setOpen] = useState(false)

    const formatRange = (range: DateRange) => {
        if (!range.from || !range.to) return "Selecionar período"
        return `${format(new Date(range.from), "dd/MM/yyyy")} → ${format(new Date(range.to), "dd/MM/yyyy")}`
    }

    const handleChange = (range: DateRange) => {
        setDateRange(range)
        onChange?.(range) // ← propaga pro pai (DashboardPage)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-60 justify-start text-left">
                    {formatRange(dateRange)}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[300px] p-4">
                <PeriodFilter
                    datePickerComponent={datePickerComponent}
                    onChange={handleChange}
                />
            </PopoverContent>
        </Popover>
    )
}
