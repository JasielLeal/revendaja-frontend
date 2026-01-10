import { api } from "@/app/backend/axios"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export function useCreateProductForCatalog() {

    type CreateProductForCatalogBody = {
        name: string,
        brand: string,
        company: string,
        category: string,
        priceNormal: string,
        priceSuggested: string,
        barcode: string,
        image?: File | null,
    }

    return useMutation({
        mutationFn: async (data: CreateProductForCatalogBody) => {
            try {
                // Criar FormData para enviar imagem
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('brand', data.brand)
                formData.append('company', data.company)
                formData.append('category', data.category)
                formData.append('priceNormal', data.priceNormal)
                formData.append('priceSuggested', data.priceSuggested)
                formData.append('barcode', data.barcode)

                if (data.image) {
                    formData.append('file', data.image)
                }

                console.log('📤 Dados enviados:', {
                    name: data.name,
                    brand: data.brand,
                    company: data.company,
                    category: data.category,
                    priceNormal: data.priceNormal,
                    priceSuggested: data.priceSuggested,
                    barcode: data.barcode,
                    hasImage: !!data.image
                });

                const response = await api.post(
                    `/catalog/create`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                return response.data
            } catch (error: unknown) {
                // Normaliza erro do axios ou genérico
                const axiosError = error as AxiosError<{ error?: string; message?: string }>
                console.error('❌ Erro completo:', error)
                console.error('❌ Resposta do backend:', axiosError.response?.data)

                const message = axiosError.response?.data?.error
                    || axiosError.response?.data?.message
                    || axiosError.message
                    || 'Erro ao criar pedido'

                throw new Error(message)
            }
        },
    })
}