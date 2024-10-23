import { Button } from "@/components/ui/button";
import { ProductsTable } from "./components/ProductsTable";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function Stock() {


    return (
        <>
            <div className="flex items-center justify-between">
                <p className="font-bold text-2xl ">Estoque</p>
                <Button>Adicionar Produto +</Button>
            </div>

            <div className="flex items-center gap-2 mt-5">
                <Input placeholder="Digite o nome do cliente" className="w-72"/>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Todas as Categorias</SelectLabel>
                            <SelectItem value="apple">Com Estoque</SelectItem>
                            <SelectItem value="banana">Sem Estoque</SelectItem>
                            <SelectItem value="blueberry">Vencendo</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button>
                    <p>
                        Filtrar
                    </p>
                </Button>
            </div>


            <ProductsTable />
        </>
    )
}