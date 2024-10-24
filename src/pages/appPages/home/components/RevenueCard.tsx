import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { IoBagHandle } from "react-icons/io5"


export function RevenueCard() {
    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <CardDescription className="flex items-center justify-between text-black font-semibold">         
                        Total em vendas
                        <IoBagHandle />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold"> R$ 22.394,23</p>
                    <p className="text-xs font-medium text-muted-foreground">+20,1% em relação ao mês passado</p>
                </CardContent>
            </Card>

        </>
    )
}