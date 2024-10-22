import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { IoAirplane, IoBagHandle, IoCloseCircleSharp } from "react-icons/io5"

export function Reminders() {
    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <CardDescription className="flex items-center justify-between text-black font-semibold">
                        Lembretes
                        <IoBagHandle />
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="flex items-center justify-between py-3 ">
                        <div className="flex items-center gap-2">
                            <p className="bg-primary p-2 rounded-full text-white">
                                <IoAirplane />
                            </p>
                            <p className="font-semibold text-sm">Vendas Não entregues</p>
                        </div>
                        <div>
                            <p className="border py-2 px-3 rounded-xl bg-muted font-medium text-xs">
                                20
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 ">
                        <div className="flex items-center gap-2">
                            <p className="bg-primary p-2 rounded-full text-white">
                            <IoCloseCircleSharp />
                            </p>
                            <p className="font-semibold text-sm">Pagamentos Atrasados</p>
                        </div>
                        <div>
                            <p className="border py-2 px-3 rounded-xl bg-muted font-medium text-xs">
                                20
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 ">
                        <div className="flex items-center gap-2">
                            <p className="bg-primary p-2 rounded-full text-white">
                            <IoCloseCircleSharp />
                            </p>
                            <p className="font-semibold text-sm">Pagamentos Atrasados</p>
                        </div>
                        <div>
                            <p className="border py-2 px-3 rounded-xl bg-muted font-medium text-xs">
                                20
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 ">
                        <div className="flex items-center gap-2">
                            <p className="bg-primary p-2 rounded-full text-white">
                            <IoCloseCircleSharp />
                            </p>
                            <p className="font-semibold text-sm">Pagamentos Atrasados</p>
                        </div>
                        <div>
                            <p className="border py-2 px-3 rounded-xl bg-muted font-medium text-xs">
                                20
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}