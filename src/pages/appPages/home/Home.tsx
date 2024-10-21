import { PeriodSelector } from "./components/PeriodSelector";
import { RevenueCard } from "./components/RevenueCard";

export function Home() {
    return (

        <>
            <div className="flex w-full items-center justify-between">
                <p className="font-semibold text-xl">Dashboard</p>
                <PeriodSelector />
            </div>
            <div className="grid grid-cols-3 gap-10 mt-7">
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
            </div>
        </>
    )
}