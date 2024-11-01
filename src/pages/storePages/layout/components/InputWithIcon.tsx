import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react"; // ou outro ícone da sua escolha

function InputWithIcon() {
    return (
        <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </span>
            <Input
                placeholder="Buscar..."
                className="pl-10" // espaçamento para acomodar o ícone
            />
        </div>
    );
}

export default InputWithIcon;
