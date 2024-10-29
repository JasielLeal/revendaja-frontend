import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { formatCurrency } from "@/utils/FormatCurrency";
import { useMutation } from '@tanstack/react-query';
import { AddToStock } from '../services/AddToStock';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddProductToStockSchema } from '../schemas/AddProductToStockSchema';

interface Product {
    id: string;
    name: string;
    imgUrl: string;
    suggestedPrice: string;
    description: string;
}

interface ModalToAddProductToStockProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export function ModalToAddProductToStock({
    isOpen,
    onClose,
    product
}: ModalToAddProductToStockProps) {

    const [quantity, setQuantity] = useState<number>(1); // Estado para a quantidade

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta)); // Impede que a quantidade fique abaixo de 1
    };

    const { register, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(AddProductToStockSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    useEffect(() => {
        setValue('quantity', quantity); // Atualiza o campo 'quantity' no formulário
    }, [quantity, setValue]);

    const { mutateAsync: AddToStockFn } = useMutation({
        mutationFn: AddToStock,
        onSuccess: () => {
            reset();
            onClose();
            setQuantity(1)
        },
        onError: (e) => {
            console.log(e);
            reset();
            onClose();
            setQuantity(1)
        },
    });

    async function onSub(data: FieldValues) {
        const newData = {
            ...data,
            productId: product.id,
        };

        await AddToStockFn(newData);
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-4 rounded shadow-lg flex">
                <div>
                    <img src={product.imgUrl} alt={product.name} width={300} />
                </div>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className="ml-4">
                        <div>
                            <Badge>Mais adicionado</Badge>
                            <Button variant={'link'} className='text-[11px]'>1º no Rank</Button>
                        </div>
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className='mb-3 text-sm'>{product.description}</p>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm text-gray-500'>De</p>
                            <p className='text-sm line-through text-gray-500'>R$ {formatCurrency(product.suggestedPrice)}</p>
                        </div>
                        <Input
                            placeholder={'Digite o valor'}
                            {...register('customPrice')}
                        />
                        <div className='flex gap-2 my-5'>
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
                                {...register('quantity')}
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
                        <div className='flex flex-col gap-4'>
                            <Button type="submit">Adicionar</Button>
                            <Button onClick={onClose} variant={'secondary'}>Fechar</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
