'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCreateOrder } from "./hooks/use-create-order"
import {
    ArrowLeft,
    CreditCard,
    Truck,
    ShieldCheck,
    CheckCircle2,
    MapPin,
    User
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useCart } from "@/app/context/cart-context"
import { useStoreBySubdomain } from "../hooks/use-store"

// Função para extrair subdomain do hostname
function getSubdomainFromHostname(): string {
    if (typeof window === 'undefined') return "demo"

    const hostname = window.location.hostname
    const parts = hostname.split('.')

    if (parts.length >= 2) {
        const extractedSubdomain = parts[0]
        if (extractedSubdomain !== 'www' && extractedSubdomain !== 'localhost') {
            return extractedSubdomain
        } else {
            return "demo"
        }
    } else {
        return "demo"
    }
}

export default function CheckoutPage() {
    const router = useRouter()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const { items, totalPrice, clearCart } = useCart()
    const { data: storeData, isLoading } = useStoreBySubdomain(subdomain)
    const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())
    const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()

    // Estados do formulário - Carregar dados salvos do localStorage
    const [formData, setFormData] = useState(() => {
        if (typeof window === 'undefined') {
            return {
                name: '',
                email: '',
                phone: '',
                cpf: '',
                deliveryType: 'delivery',
                zipCode: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                paymentMethod: 'pix',
            }
        }

        const savedData = localStorage.getItem('checkout_user_data')
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                return {
                    ...parsed,
                    deliveryType: 'delivery', // Sempre resetar para delivery
                    paymentMethod: parsed.paymentMethod || 'pix',
                }
            } catch (error) {
                console.error('Erro ao carregar dados salvos:', error)
            }
        }

        return {
            name: '',
            email: '',
            phone: '',
            cpf: '',
            deliveryType: 'delivery',
            zipCode: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            paymentMethod: 'pix',
        }
    })

    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [useNewAddress, setUseNewAddress] = useState(false)

    // Verificar se há endereço salvo diretamente na inicialização
    const [hasSavedAddress] = useState(() => {
        if (typeof window === 'undefined') return false

        const savedData = localStorage.getItem('checkout_user_data')
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                return !!(parsed.street && parsed.number && parsed.city)
            } catch {
                return false
            }
        }
        return false
    })

    // Calcular valores
    const subtotal = totalPrice
    const shipping = formData.deliveryType === 'pickup' ? 0 : (subtotal > 200 ? 0 : 15)
    const total = subtotal + shipping

    type FormDataType = typeof formData;

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: FormDataType) => ({ ...prev, [field]: value }))
    }

    const handleSubmitOrder = async () => {
        if (isSubmitting || isCreatingOrder) return
        setIsSubmitting(true)

        // Salvar dados do usuário no localStorage para próximas compras
        const userDataToSave = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            cpf: formData.cpf,
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            paymentMethod: formData.paymentMethod,
        }
        localStorage.setItem('checkout_user_data', JSON.stringify(userDataToSave))

        const paymentMethodLabel = formData.paymentMethod === 'pix'
            ? 'Pix'
            : formData.paymentMethod === 'credit_card'
                ? 'Credito'
                : 'Dinheiro'

        const orderPayload = {
            customerName: formData.name,
            customerPhone: formData.phone?.replace(/\D/g, '') || '',
            status: 'approved',
            subdomain: subdomain,
            paymentMethod: paymentMethodLabel,
            createdAt: new Date().toISOString().split('T')[0],
            isDelivery: formData.deliveryType === 'delivery',
            deliveryStreet: formData.deliveryType === 'delivery' ? formData.street : undefined,
            deliveryNumber: formData.deliveryType === 'delivery' ? formData.number : undefined,
            deliveryNeighborhood: formData.deliveryType === 'delivery' ? formData.neighborhood : undefined,
            items: items.map(item => ({
                storeProductId: item.id,
                quantity: item.quantity,
            })),
        }

        try {
            await createOrder(orderPayload)

            // Simular processamento
            setStep(3)

            // Limpar carrinho após 3 segundos e abrir WhatsApp
            setTimeout(() => {
                clearCart()

                // Redirecionar para WhatsApp da loja para confirmar pagamento
                const message = encodeURIComponent(
                    `Olá! Acabei de realizar um pedido:\n\n` +
                    `Pedido: #${orderNumber}\n` +
                    `Valor: ${formatCurrency(total)}\n` +
                    `Forma de pagamento: ${paymentMethodLabel}\n` +
                    `${formData.deliveryType === 'delivery' ? 'Entrega' : 'Retirada na loja'}`
                )

                if (storeData?.phone) {
                    window.open(`https://wa.me/${storeData.phone.replace(/\D/g, '')}?text=${message}`, '_blank')
                }
            }, 3000)
        } catch (error) {
            console.error('Erro ao criar pedido', error)
            alert('Não foi possível finalizar o pedido. Tente novamente.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    if (!storeData) {
        return null
    }

    // Carrinho vazio
    if (items.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Carrinho vazio
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Adicione produtos ao carrinho para finalizar a compra
                            </p>
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="text-white"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Voltar para a Loja
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // Página de confirmação
    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="text-center p-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Pedido Confirmado!
                            </h1>
                            <p className="text-gray-600 mb-2">
                                Seu pedido foi realizado com sucesso.
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                Você receberá um e-mail com os detalhes do pedido.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="text-sm text-gray-600 mb-2">Número do Pedido</div>
                                <div className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                    #{orderNumber}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    size="lg"
                                    className="w-full text-white"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                    onClick={() => router.push('/')}
                                >
                                    Voltar para a Loja
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push('/orders')}
                                >
                                    Ver Meus Pedidos
                                </Button>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Cabeçalho */}
                    <div className="mb-2">

                        <h1 className="text-md md:text-4xl text-center font-bold text-gray-900">
                            Finalizar Compra
                        </h1>
                    </div>

                    {/* Progress indicator (responsive) */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                        <div className="flex items-center justify-center gap-6">
                            {['Carrinho', 'Confirmação', 'Finalizar'].map((step, i) => {
                                const stepIndex = i + 1
                                const active = stepIndex === 2
                                return (
                                    <div key={step} className="flex items-center gap-3">
                                        <div
                                            className={`flex items-center justify-center rounded-full ${active ? 'w-8 h-8 scale-100' : 'w-7 h-7 scale-95'} transition-all duration-300 ${active ? '' : ''}`}
                                            style={active ? { background: storeData.primaryColor } : { background: '#E6E6E6' }}
                                        >
                                            <span className={`text-white text-xs font-semibold`}>{stepIndex}</span>
                                        </div>
                                        <div className="sm:block text-xs text-gray-600">{step}</div>
                                        {i < 2 && <div className="hidden sm:block w-12 h-[2px]" style={{ background: '#E6E6E6' }} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Formulário */}
                        <div className="lg:col-span-2 space-y-6">

                            {step === 1 && (
                                <>
                                    {/* Dados Pessoais */}
                                    <div>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="name" className="mb-1">Nome</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Seu nome"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="phone" className="mb-1">Telefone</Label>
                                                    <Input
                                                        id="phone"
                                                        placeholder="(00) 00000-0000"
                                                        value={formData.phone}
                                                        className="bg-white"
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Tipo de Entrega */}
                                    <div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Truck className="h-5 w-5" />
                                                Tipo de Entrega
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label
                                                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.deliveryType === 'delivery'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="deliveryType"
                                                        value="delivery"
                                                        checked={formData.deliveryType === 'delivery'}
                                                        onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                                                        className="w-4 h-4"
                                                        style={{ accentColor: storeData.primaryColor }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">Entrega</p>
                                                        <p className="text-xs text-gray-600">Receba em casa</p>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.deliveryType === 'pickup'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="deliveryType"
                                                        value="pickup"
                                                        checked={formData.deliveryType === 'pickup'}
                                                        onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                                                        className="w-4 h-4"
                                                        style={{ accentColor: storeData.primaryColor }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">Retirada</p>
                                                        <p className="text-xs text-gray-600">Retirar na loja</p>
                                                    </div>
                                                </label>
                                            </div>

                                            {formData.deliveryType === 'pickup' && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                    <p className="text-sm text-blue-900 font-medium mb-1">
                                                        📍 Endereço para retirada:
                                                    </p>
                                                    <p className="text-sm text-blue-800">
                                                        {storeData.address}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Seleção de Endereço - Só aparece se tiver endereço salvo e for entrega */}
                                    {hasSavedAddress && formData.deliveryType === 'delivery' && (
                                        <div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-5 w-5" />
                                                    Selecionar Endereço
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-3">
                                                    <label
                                                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${!useNewAddress
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="addressChoice"
                                                            checked={!useNewAddress}
                                                            onChange={() => setUseNewAddress(false)}
                                                            className="w-4 h-4 mt-0.5"
                                                            style={{ accentColor: storeData.primaryColor }}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm mb-1">Usar endereço salvo</p>
                                                            <p className="text-sm text-gray-600">
                                                                {formData.street}, {formData.number}
                                                                {formData.complement && ` - ${formData.complement}`}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {formData.neighborhood} - {formData.city}/{formData.state}
                                                            </p>
                                                        </div>
                                                    </label>

                                                    <label
                                                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${useNewAddress
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="addressChoice"
                                                            checked={useNewAddress}
                                                            onChange={() => setUseNewAddress(true)}
                                                            className="w-4 h-4"
                                                            style={{ accentColor: storeData.primaryColor }}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm">Usar novo endereço</p>
                                                            <p className="text-xs text-gray-600">Preencher novo endereço de entrega</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Endereço - Só aparece se for entrega E (não tiver endereço salvo OU escolheu novo endereço) */}
                                    {formData.deliveryType === 'delivery' && (!hasSavedAddress || useNewAddress) && (
                                        <div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-5 w-5" />
                                                    Endereço de Entrega
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <Input
                                                        id="street"
                                                        placeholder="Nome da rua"
                                                        value={formData.street}
                                                        className="bg-white mt-2"
                                                        onChange={(e) => handleInputChange('street', e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Input
                                                            id="number"
                                                            placeholder="123"
                                                            value={formData.number}
                                                            className="bg-white"
                                                            onChange={(e) => handleInputChange('number', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Input
                                                            id="neighborhood"
                                                            placeholder="Nome do bairro"
                                                            value={formData.neighborhood}
                                                            className="bg-white"
                                                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>

                                                    <Input
                                                        id="complement"
                                                        placeholder="Apto, Bloco..."
                                                        className="bg-white"
                                                        value={formData.complement}
                                                        onChange={(e) => handleInputChange('complement', e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        
                                                        <Input
                                                            id="city"
                                                            placeholder="Sua cidade"
                                                            value={formData.city}
                                                            className="bg-white"
                                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                        
                                                        <Input
                                                            id="state"
                                                            placeholder="UF"
                                                            className="bg-white"
                                                            maxLength={2}
                                                            value={formData.state}
                                                            onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    {/* Forma de Pagamento */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <CreditCard className="h-5 w-5" />
                                                Forma de Pagamento
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-sm text-gray-600 mb-4">
                                                O pagamento será confirmado pelo vendedor via WhatsApp após finalizar o pedido.
                                            </p>

                                            <div className="space-y-3">
                                                <label
                                                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'pix'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="pix"
                                                        checked={formData.paymentMethod === 'pix'}
                                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                                        className="w-4 h-4"
                                                        style={{ accentColor: storeData.primaryColor }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">PIX</p>
                                                        <p className="text-xs text-gray-600">Pagamento instantâneo</p>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                                                        Recomendado
                                                    </Badge>
                                                </label>

                                                <label
                                                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'credit_card'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="credit_card"
                                                        checked={formData.paymentMethod === 'credit_card'}
                                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                                        className="w-4 h-4"
                                                        style={{ accentColor: storeData.primaryColor }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">Cartão de Crédito</p>
                                                        <p className="text-xs text-gray-600">Pagamento instantâneo</p>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'money'
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="money"
                                                        checked={formData.paymentMethod === 'money'}
                                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                                        className="w-4 h-4"
                                                        style={{ accentColor: storeData.primaryColor }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">Dinheiro</p>
                                                        <p className="text-xs text-gray-600">Pagamento em espécie</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex gap-4">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setStep(1)}
                                        >
                                            Voltar
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="flex-1 text-white"
                                            style={{ backgroundColor: storeData.primaryColor }}
                                            onClick={handleSubmitOrder}
                                            disabled={isSubmitting || isCreatingOrder}
                                        >
                                            {isSubmitting || isCreatingOrder ? 'Enviando...' : 'Finalizar Pedido'}
                                        </Button>
                                    </div>
                                </>
                            )}

                        </div>

                        {/* Resumo do Pedido */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-4">

                                {/* Produtos */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Resumo do Pedido</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-3">
                                                <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Qtd: {item.quantity}
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <Separator />

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                    {formData.deliveryType === 'pickup' ? 'Retirada' : 'Frete'}
                                                </span>
                                                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                                                    {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                                                </span>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                                {formatCurrency(total)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full text-white"
                            style={{ backgroundColor: storeData.primaryColor }}
                            onClick={() => setStep(2)}
                        >
                            Continuar para Pagamento
                        </Button>

                    </div>
                </div>
            </main>
        </div>
    )
}
