'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "@/app/hooks/use-debounce"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export function StockFilters() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [searchValue, setSearchValue] = useState(searchParams.get('query') ?? '')
    const debouncedSearch = useDebounce(searchValue, 500)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            if (value && value !== 'all') {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            return params.toString()
        },
        [searchParams]
    )

    // Update URL when debounced search value changes
    useEffect(() => {
        router.push(pathname + '?' + createQueryString('query', debouncedSearch))
    }, [debouncedSearch, pathname, router, createQueryString])

    const brands = [
        { label: "Todos", value: "all" },
        { label: "Natura", value: "natura" },
        { label: "Avon", value: "avon" },
        { label: "Boticário", value: "boticario" },
    ]

    const categories = [
        { label: "Todos", value: "all" },
        { label: "Perfume Masculino", value: "perfume-masculino" },
        { label: "Perfume Feminino", value: "perfume-feminino" },
        { label: "Hidratante", value: "hidratante" },
        { label: "Maquiagem", value: "maquiagem" },
    ]

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Buscar produtos..."
                    className="pl-10"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <Select
                defaultValue={searchParams.get('brand') ?? undefined}
                onValueChange={(value) => {
                    router.push(pathname + '?' + createQueryString('brand', value))
                }}
            >
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent>
                    {brands.map(brand => (
                        <SelectItem key={brand.value} value={brand.value}>
                            {brand.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                defaultValue={searchParams.get('category') ?? undefined}
                onValueChange={(value) => {
                    router.push(pathname + '?' + createQueryString('category', value))
                }}
            >
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}