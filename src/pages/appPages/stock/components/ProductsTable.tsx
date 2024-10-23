
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import produto from "@/assets/Produto.jpg"
import { Button } from "@/components/ui/button"
import { IoEllipsisVerticalSharp } from "react-icons/io5"


export function ProductsTable() {
    return (
        <>
            <Table className="mt-5">
                <TableCaption>Lista do Estoque</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço de Venda</TableHead>
                        <TableHead>Preço Normal</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center">
                                <img src={produto} alt="produto" width={60} />
                                <div>
                                    <p className="font-semibold">Kaiak Tradicional</p>
                                    <p>Natura - 14331</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <p>R$ 123,00</p>
                        </TableCell>
                        <TableCell>
                            R$ 200,00
                        </TableCell>
                        <TableCell>
                            20
                        </TableCell>
                        <TableCell >
                            <Button variant={'ghost'}>
                                <IoEllipsisVerticalSharp />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </>
    )
}