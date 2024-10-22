import { Button } from "@/components/ui/button";
import { PeriodSelector } from "./components/PeriodSelector";
import { ReceivablesCard } from "./components/ReceivablesCard";
import { RevenueCard } from "./components/RevenueCard";
import { TotalReceived } from "./components/TotalReceived";
import { MonthlySalesComparisonChart } from "./components/MonthlySalesComparisonChart";
import { Reminders } from "./components/Reminders";

export function Home() {
    return (

        <>
            <div className="flex w-full items-center justify-between">
                <p className="font-bold text-2xl ">Dashboard</p>
                <div className="flex items-center gap-2">
                    <PeriodSelector />
                    <Button>Download</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-10 mt-7">
                <RevenueCard />
                <ReceivablesCard />
                <TotalReceived />
            </div>
            <div className="grid grid-cols-9 mt-10 gap-4">
                <div className="col-span-5">
                    <MonthlySalesComparisonChart />
                </div>
                <div className="col-span-4">
                    <Reminders />
                </div>
            </div>
        </>
    )
}