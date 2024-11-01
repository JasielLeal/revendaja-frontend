import { Button } from "@/components/ui/button";
import { OnSale } from "./components/OnSale";

export function Products() {
    return (
        <>
            <div className="w-full flex gap-2 mb-5">
                <Button className="w-full" variant={'secondary'}>
                    Filtrar
                </Button>
                <Button className="w-full" variant={'secondary'}>
                    Ordernar
                </Button>
            </div>
            <OnSale />
        </>
    )
}