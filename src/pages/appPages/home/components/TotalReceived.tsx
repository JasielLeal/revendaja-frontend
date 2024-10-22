import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { IoBagHandle } from "react-icons/io5"


export function TotalReceived() {
    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <CardDescription className="flex items-center justify-between text-black font-semibold">
                        Total Recebido
                        <IoBagHandle />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold"> R$ 14.052,33</p>
                    <p className="text-xs font-medium text-muted-foreground">+5,1% em relação ao mês passado</p>
                </CardContent>
            </Card>

        </>
    )
}