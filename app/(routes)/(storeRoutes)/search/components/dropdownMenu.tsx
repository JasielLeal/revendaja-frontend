'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Definindo a interface para o componente aceitar uma função de callback como prop
interface DropDownMenuProps {
    onOrderChange: (value: string) => void; // Função callback que o pai passará
}

export function DropDownMenu({ onOrderChange }: DropDownMenuProps) {
    const [orderBy, setOrderBy] = useState<string>(''); // Estado local para armazenar a opção selecionada

    // Mapeamento das opções para o texto legível
    const orderLabels: { [key: string]: string } = {
        bestSeller: "Mais vendidos",
        maxPrice: "Maior preço",
        minPrice: "Menor Preço",
    };

    const handleOrderChange = (value: string) => {
        setOrderBy(value);  // Atualiza a opção selecionada
        onOrderChange(value); // Chama a função do pai para passar o valor selecionado
    };

    return (
        <DropdownMenu>
            {/* Exibindo o texto legível correspondente à opção selecionada */}
            <DropdownMenuTrigger className="bg-primary py-1 px-5 rounded-xl text-white">
                {orderBy ? orderLabels[orderBy] : 'Ordenar Por'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleOrderChange('bestSeller')}>
                    Mais vendidos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOrderChange('maxPrice')}>
                    Maior preço
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOrderChange('minPrice')}>
                    Menor Preço
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
