import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AddProductToStock() {
    return (
        <>
            <p className="font-bold text-xl ">Estoque</p>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/estoque">Estoque</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/addproductstock">Adicionar Produto</BreadcrumbLink>
                    </BreadcrumbItem>
                    
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-5 flex items-center gap-3">
                <Input placeholder="Procurar produto" className="w-72" />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Todas as Categorias</SelectLabel>
                            <SelectItem value="apple">Natura</SelectItem>
                            <SelectItem value="banana">OBoticario</SelectItem>
                            <SelectItem value="blueberry">Avon</SelectItem>
                            <SelectItem value="blueberry">Eudora</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}