import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function PeriodSelector() {
    return (
        <>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Últimos 7 dias" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="dark">15 dias atrás</SelectItem>
                    <SelectItem value="system">30 dias atrás</SelectItem>
                </SelectContent>
            </Select>

        </>
    )
}