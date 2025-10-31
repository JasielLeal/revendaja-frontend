"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface DateSelectorProps {
  onChange: (range: { from?: string; to?: string } | undefined) => void
}

export function DateSelector({ onChange }: DateSelectorProps) {
  const [date, setDate] = useState<DateRange | undefined>()

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)

    if (!range) {

      onChange(undefined)
      return
    }

    const formatDate = (d: Date) => {
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const day = String(d.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }

    const formatted = {
      from: range.from ? formatDate(range.from) : undefined,
      to: range.to ? formatDate(range.to) : undefined,
    }


    onChange(formatted)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from && date?.to
            ? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
            : "Selecionar período"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={date}
          onSelect={handleSelect}
          locale={ptBR}
          className="rounded-md border bg-background shadow"
        />
      </PopoverContent>
    </Popover>
  )
}
