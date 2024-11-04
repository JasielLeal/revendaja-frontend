import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GetStockForStoreName } from "../services/GetStockForStoreName";
import { useState } from "react";
import { useDomain } from "@/context/DomainContext";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { IoCartOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";


export function OnSale() {
    const { subdomain } = useDomain();
    const storeName = String(subdomain);

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useQuery({
        queryKey: ["GetStockForStoreName", currentPage, storeName],
        queryFn: () => GetStockForStoreName(currentPage, pageSize, storeName),
    });

    const [quantity, setQuantity] = useState<number>(0); // Estado para a quantidade

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta)); // Impede que a quantidade fique abaixo de 1
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

    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.data.items.map((produto: StockItem) => {
                const item = produto.product || produto.customProduct; // Seleciona o produto normal ou customizado
                return (

                    <div key={produto.id} className="border p-2 rounded-lg">
                        <button onClick={()=> navigate(`/produtos/${item?.name}/${item?.id}`)}>
                            <img src={item?.imgUrl} alt={item?.name} />
                        </button>
                        <p className="font-semibold mb-3 text-sm">{item?.name}</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="line-through text-xs">
                                    R$ {(Number(produto?.normalPrice) / 100).toFixed(2)}
                                </p>
                                <p className="font-semibold text-xl">
                                    R$ {(Number(produto?.customPrice) / 100).toFixed(2)}
                                </p>
                            </div>
                            <Drawer>
                                <DrawerTrigger className="text-2xl">
                                    <IoCartOutline />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle className="text-start">
                                            <img src={item?.imgUrl} alt="" />
                                            {item?.name}
                                            </DrawerTitle>
                                        <DrawerDescription className="text-start my-3">
                                            <p className="line-through text-xs">
                                                R$ {(Number(produto?.normalPrice) / 100).toFixed(2)}
                                            </p>
                                            <p className="font-semibold text-xl">
                                                R$ {(Number(produto?.customPrice) / 100).toFixed(2)}
                                            </p>
                                        </DrawerDescription>
                                        <div className="flex gap-2">
                                            <Button
                                                size={'icon'}
                                                onClick={() => handleQuantityChange(-1)}
                                                type='button'
                                            >
                                                -
                                            </Button>
                                            <Input
                                                value={quantity}
                                                className='w-14 text-center'
                                                readOnly
                                            />
                                            <Button
                                                size={'icon'}
                                                onClick={() => handleQuantityChange(1)}
                                                type='button'
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <Button>Adicionar ao carrinho</Button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
