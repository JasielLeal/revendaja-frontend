import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropDownMenu() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary py-1 px-5 rounded-xl text-white">Ordenar Por</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Mais vendidos</DropdownMenuItem>
                    <DropdownMenuItem>Maior preço</DropdownMenuItem>
                    <DropdownMenuItem>Menor Preço</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}