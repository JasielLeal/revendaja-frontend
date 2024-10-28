import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import produto from '@/assets/Produto.jpg';

export function ModalToAddProductToStock({ isOpen, onClose, product }) {


    return (
        <>


            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded shadow-lg flex">
                    <div>
                        <img src={produto} alt={product.name} width={300} />
                    </div>
                    <div>
                        <div>
                            <Badge>Mais adicionado</Badge>
                            <Button variant={'link'} className='text-[11px]'>1º no Rank </Button>
                        </div>
                        <h2 className="text-lg font-semibold mb-3">{product.name}</h2>
                        <p className='text-xs font-semibold line-through text-gray-500'>{product.suggestedPrice}</p>
                        <Input placeholder={product.suggestedPrice} />
                        <div className='flex gap-2 my-5'>
                            <Button size={'icon'}>-</Button>
                            <Input placeholder='1' className='w-10 text-center' />
                            <Button size={'icon'}>+</Button>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Button onClick={onClose} >Adicionar</Button>
                            <Button onClick={onClose} variant={'secondary'}>Fechar</Button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}