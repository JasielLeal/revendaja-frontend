import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./components/ProductsTable";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export function Stock() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // Para armazenar o valor do input
    const [filterTerm, setFilterTerm] = useState(""); // Para passar para o ProductsTable

    // Função para aplicar o filtro quando o botão for clicado
    const handleFilter = () => {
        setFilterTerm(searchTerm); // Define o termo de filtro quando o botão for clicado
    };

    // Monitora as mudanças no input e limpa o filtro se o input ficar vazio
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Se o input ficar vazio, reseta o filtro para o padrão
        if (value === "") {
            setFilterTerm(""); // Reseta o filtro
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="font-bold text-xl ">Estoque</p>
                <Button onClick={() => navigate('/estoque/adicionarproduto')}>Adicionar Produto +</Button>
            </div>

            <div className="flex items-center gap-2 mt-5">
                <Input
                    placeholder="Digite o nome do produto"
                    value={searchTerm} // Valor do input
                    onChange={handleInputChange} // Monitora as mudanças no input
                    className="w-80"
                />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Todas as Categorias</SelectLabel>
                            <SelectItem value="apple">Com Estoque</SelectItem>
                            <SelectItem value="banana">Sem Estoque</SelectItem>
                            <SelectItem value="blueberry">Vencendo</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button onClick={handleFilter}>
                    <p>Filtrar</p>
                </Button>
            </div>

            {/* Passa o filterTerm para o ProductsTable */}
            <ProductsTable filter={filterTerm} />
        </>
    );
}
