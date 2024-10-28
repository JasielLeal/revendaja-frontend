import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IoChevronBack, IoChevronForwardOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { GetStock } from "../services/GetStock";
import { useState } from "react";
import { formatCurrency } from "@/utils/FormatCurrency";

export function ProductsTable({ filter, category }: { filter: string; category: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Defina o número de itens por página

    // Query para pegar os produtos, agora passando o termo de filtro e a categoria
    const { data: List } = useQuery({
        queryKey: ["GetStock", currentPage, filter, category], // Inclui o termo de filtro e categoria como parte da queryKey
        queryFn: () => GetStock(currentPage, pageSize, filter, category), // Passa o termo de filtro e categoria para a função GetStock
    });

    interface Product {
        id: string;
        name: string;
        normalPrice: string;
        suggestedPrice: string;
        description: string;
        imgUrl: string;
        brand: string;
        company: string;
        createdAt: string;
        updatedAt: string;
    }

    interface StockItem {
        id: string;
        quantity: number;
        customPrice: string;
        suggestedPrice: string;
        normalPrice: string;
        status: string;
        storeId: string;
        productId: string;
        updatedAt: string;
        product: Product | null;
        customProduct: Product | null;
    }

    const handleNextPage = () => {
        if (currentPage < (List?.data.totalPages || 0)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <>
            <Table className="mt-5 w-full rounded">
                <TableCaption>
                    <div className="flex gap-10 mt-3 items-center justify-end w-full">
                        <p className="font-medium">
                            Página {List?.data.currentPage} de {List?.data.totalPages === 0 ? '1' : List?.data.totalPages}
                        </p>
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1} // Desabilitar se na primeira página
                            >
                                <IoChevronBack />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNextPage}
                                disabled={currentPage === List?.data.totalPages} // Desabilitar se na última página
                            >
                                <IoChevronForwardOutline />
                            </Button>
                        </div>
                    </div>
                    Lista do Estoque
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço de Venda</TableHead>
                        <TableHead>Preço Normal</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="h-[384px]">
                    {List?.data.items?.map((item: StockItem) => {
                        const product = item.product || item.customProduct; // Verifica se é produto ou customizado
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <img src={product?.imgUrl || ""} alt="produto" width={60} />
                                        <div>
                                            <p className="font-semibold">{product?.name}</p>
                                            <p>{product?.company || "Personalizado"}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    R$ {formatCurrency(item.customPrice)}
                                </TableCell>
                                <TableCell>
                                    R$ {formatCurrency(item.normalPrice)}
                                </TableCell>
                                <TableCell>
                                    {item.quantity}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost">
                                        <IoEllipsisVerticalSharp />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
