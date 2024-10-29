import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import produto from '@/assets/Produto.jpg';
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GetAllProducts } from "../services/GetAllProducts";
import { useState } from "react";
import { formatCurrency } from "@/utils/FormatCurrency";
import { IoChevronBack, IoChevronForwardOutline } from "react-icons/io5";
import { ModalToAddProductToStock } from "./ModalToAddProductToStock";

export function TableOfProductsToAdd({ filter, category }: { filter: string, category: string }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const pageSize = 5;

    const { data: List } = useQuery({
        queryKey: ["GetAllProducts", currentPage, filter, category],
        queryFn: () => GetAllProducts(currentPage, pageSize, filter, category),
    });

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

    const openModal = (product: Product) => {
        setSelectedProduct(product); // Define o produto selecionado
        setModalOpen(true); // Abre o modal
    };

    return (
        <>
            <Table>
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
                                disabled={currentPage === 1}
                            >
                                <IoChevronBack />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNextPage}
                                disabled={currentPage === List?.data.totalPages}
                            >
                                <IoChevronForwardOutline />
                            </Button>
                        </div>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Preço Sugerido</TableHead>
                        <TableHead>Preço Normal</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {List?.data.items.map((product: Product) => (
                        <TableRow className="cursor-pointer hover:bg-gray-100" key={product.id} onClick={() => openModal(product)}>
                            <TableCell className="w-96" >
                                <div className="flex items-center text-left">
                                    <img src={product.imgUrl} alt="produto" width={60} />
                                    <div className="ml-4">
                                        <p className="font-semibold">{product.name}</p>
                                        <p>{product.brand}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{product.company}</TableCell>
                            <TableCell>R${formatCurrency(product.suggestedPrice)}</TableCell>
                            <TableCell>R${formatCurrency(product.normalPrice)}</TableCell>
                            <TableCell>
                                <Button size="icon" >+</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Passa o produto selecionado para o modal */}
            {selectedProduct && (
                <ModalToAddProductToStock
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    product={selectedProduct} // Passa o produto selecionado
                />
            )}
        </>
    );
};
