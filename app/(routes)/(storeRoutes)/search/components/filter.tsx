import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Filter() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="text-text font-medium">Filtrar</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Perfume</DropdownMenuItem>
                    <DropdownMenuItem>Hidratante</DropdownMenuItem>
                    <DropdownMenuItem>Sabonete</DropdownMenuItem>
                    <DropdownMenuItem>Natura</DropdownMenuItem>
                    <DropdownMenuItem>Boticário</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}