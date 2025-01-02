import { useDomain } from "@/app/context/DomainContext";
import { useQuery } from "@tanstack/react-query";
import { GetTheTopBestSellingProducts } from "../services/GetTheTopBestSellingProducts";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BestSellingProducts() {

    const { storeData } = useDomain();
    const { data: ProductsOnPromotion } = useQuery({
        queryKey: ['GetTheTopBestSellingProducts', storeData?.subdomain],
        queryFn: () => GetTheTopBestSellingProducts(storeData?.subdomain),
    })

    type ProductProps = {
        id: number;
        normalPrice: string;
        customPrice: string;
        stock: {
            id: number;
            normalPrice: string;
            customPrice: string;
            discountValue: string
            product: {
                id: number;
                name: string;
                brand: string;
                imgUrl: string;
                normalPrice: string;
            };
            customProduct: {
                id: number;
                name: string;
                brand: string;
                imgUrl: string;
                normalPrice: string;
            };
        }
    }

     const router = useRouter();
    

    return (
        <div className="px-4 mb-10">
            <div className="flex items-center justify-between mb-4 mt-10">
                <p className="text-text font-medium">Mais vendidos</p>
                <Link href={'/'} className="text-text font-medium">Ver todos</Link>
            </div>
            <div className="flex overflow-x-scroll space-x-3 no-scrollbar no-">
                {ProductsOnPromotion && ProductsOnPromotion.map((item: ProductProps) => {
                    const stock = item.stock;
                    const produto = stock.product || stock.customProduct;

                    const discountPercentage = stock.discountValue ? calculatePercentage(Number(stock.normalPrice), Number(stock.customPrice)).percentage : null;

                    return (
                        <div
                            key={stock.id}
                            className="flex flex-col justify-between w-36 rounded-lg relative"
                            style={{ minWidth: "170px" }} // garante que cada item tenha largura fixa no carrossel
                            onClick={() => router.push(`/p/${produto.name}/${produto.id}`)}
                        >
                            <div className="relative">
                                {discountPercentage !== null && (
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                        {discountPercentage.toFixed(0)}% OFF
                                    </div>
                                )}
                                <div className="flex items-center w-full justify-center">
                                    <Image src={produto.imgUrl || '/path/to/defaultImage.jpg'} alt={produto.name} className="mb-3 rounded-xl" width={170} height={170} priority />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">{produto.brand}</p>
                            <p className="font-semibold mb-2 text-text text-sm line-clamp-2">{produto.name}</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="line-through text-xs text-gray-500">R$ {formatCurrency(stock.normalPrice)}</p>
                                    <p className="font-semibold text-xl text-text">R$ {formatCurrency(stock.customPrice)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}