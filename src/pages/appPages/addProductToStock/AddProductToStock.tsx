import { Input } from "@/components/ui/input";
import { BreadcrumbListComponent } from "./components/BreadcrumbList";
import { SelectCompany } from "./components/SelectCompany";
import { TableOfProductsToAdd } from "./components/TableOfProductsToAdd";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AddProductToStock() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // Estado para armazenar o filtro de categoria ao clicar no botão

    const handleFilter = () => {
        setFilterTerm(searchTerm); // Define o termo de busca
        setCategoryFilter(selectedCategory); // Define o filtro de categoria ao clicar no botão
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilterTerm("");
        }
    };

    return (
        <>
            <p className="font-bold text-xl">Adicione produtos ao seu estoque</p>
            <BreadcrumbListComponent />

            <div className="mt-5 flex items-center gap-3 mb-5">
                <Input
                    placeholder="Procurar produto"
                    className="w-72"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <SelectCompany onSelectChange={setSelectedCategory} />
                <Button onClick={handleFilter}>Filtrar</Button>
            </div>

            <TableOfProductsToAdd filter={filterTerm} category={categoryFilter} />
        </>
    );
}
