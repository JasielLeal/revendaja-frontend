import { Button } from "@/components/ui/button";
import { OnSale } from "./components/OnSale";

export function Home() {

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <p className="font-semibold ">Promoções</p>
                <Button variant={'link'}>
                    Ver todas
                </Button>
            </div>
            <OnSale />
        </>
    )
}