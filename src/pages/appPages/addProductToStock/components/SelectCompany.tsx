import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type SelectCompanyProps = {
    onSelectChange: (value: string) => void;
};

export function SelectCompany({ onSelectChange }: SelectCompanyProps) {
    const [category, setCategory] = useState("");

    const handleSelectChange = (value: string) => {
        setCategory(value); // Armazena o valor do Select
        onSelectChange(value); // Passa o valor selecionado para o componente pai
    };

    return (
        <>
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Selecione uma marca</SelectLabel>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="natura">Natura</SelectItem>
                        <SelectItem value="oboticario">OBoticario</SelectItem>
                        <SelectItem value="avon">Avon</SelectItem>
                        <SelectItem value="eudora">Eudora</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}
