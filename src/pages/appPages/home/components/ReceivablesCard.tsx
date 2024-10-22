import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { IoWallet } from "react-icons/io5"


export function ReceivablesCard() {
    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <CardDescription className="flex items-center justify-between text-black font-semibold">
                        Total a receber
                        <IoWallet />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold"> R$ 8.342,23</p>
                    <p className="text-xs font-medium text-muted-foreground">+0,1% em relação ao mês passado</p>
                </CardContent>
            </Card>

        </>
    )
}