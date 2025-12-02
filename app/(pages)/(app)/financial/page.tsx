"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
    IconTrendingUp,
    IconTrendingDown,
    IconCurrencyDollar,
    IconShoppingCart,
    IconCreditCard,
    IconDeviceFloppy,
    IconReceipt,
    IconDownload,
    IconFilter
} from "@tabler/icons-react";
import { Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import { Skeleton } from "@/components/ui/skeleton";

// Cores para o gráfico de pizza
const BRAND_COLORS = [
    "#e91e63", // Rosa (Natura)
    "#9c27b0", // Roxo (Boticário)  
    "#2196f3", // Azul (Avon)
    "#ff9800", // Laranja (Eudora)
    "#4caf50", // Verde (Outras)
];

// Configuração do gráfico
const chartConfig: ChartConfig = {
    natura: {
        label: "Natura",
        color: BRAND_COLORS[0],
    },
    boticario: {
        label: "Boticário",
        color: BRAND_COLORS[1],
    },
    avon: {
        label: "Avon",
        color: BRAND_COLORS[2],
    },
    eudora: {
        label: "Eudora",
        color: BRAND_COLORS[3],
    },
};

// Mock data - aqui você vai substituir pelas chamadas reais da API
const mockFinancialData = {
    // Resumo geral
    summary: {
        totalRevenue: 45680.50,
        totalExpenses: 18230.75,
        netProfit: 27449.75,
        profitMargin: 60.1,
        periodGrowth: 15.3,
    },

    // Receitas por categoria
    revenueByCategory: [
        { category: "Vendas Presenciais", amount: 28500.00, percentage: 62.4 },
        { category: "Loja Online", amount: 17180.50, percentage: 37.6 },
    ],

    // Despesas por categoria
    expensesByCategory: [
        { category: "Produtos/Estoque", amount: 12500.00, percentage: 68.6 },
        { category: "Marketing", amount: 2800.00, percentage: 15.4 },
        { category: "Operacionais", amount: 1930.75, percentage: 10.6 },
        { category: "Outros", amount: 1000.00, percentage: 5.4 },
    ],

    // Vendas por marca (para gráfico de pizza)
    salesByBrand: [
        { brand: "Natura", amount: 18500.00, quantity: 125, percentage: 40.5, averagePrice: 148.00 },
        { brand: "Boticário", amount: 15200.00, quantity: 89, percentage: 33.3, averagePrice: 170.79 },
        { brand: "Avon", amount: 8300.00, quantity: 67, percentage: 18.2, averagePrice: 123.88 },
        { brand: "Eudora", amount: 2680.50, quantity: 18, percentage: 5.9, averagePrice: 148.92 },
        { brand: "Outros", amount: 1000.00, quantity: 10, percentage: 2.1, averagePrice: 100.00 },
    ],

    // Fluxo de caixa mensal (últimos 12 meses) - mantido para referência futura
    cashFlow: [
        { month: "Jan", revenue: 38500, expenses: 15200, profit: 23300 },
        { month: "Fev", revenue: 42100, expenses: 16800, profit: 25300 },
        { month: "Mar", revenue: 39800, expenses: 15900, profit: 23900 },
        { month: "Abr", revenue: 44200, expenses: 17500, profit: 26700 },
        { month: "Mai", revenue: 41900, expenses: 16200, profit: 25700 },
        { month: "Jun", revenue: 45680, expenses: 18230, profit: 27450 },
    ],

    // Transações recentes
    recentTransactions: [
        {
            id: 1,
            type: "revenue",
            description: "Venda #1234 - Maria Silva",
            amount: 285.50,
            date: "2025-11-10",
            method: "PIX",
            status: "completed"
        },
        {
            id: 2,
            type: "expense",
            description: "Compra de estoque - Fornecedor ABC",
            amount: -1250.00,
            date: "2025-11-09",
            method: "Cartão",
            status: "completed"
        },
        {
            id: 3,
            type: "revenue",
            description: "Pedido Online #5678",
            amount: 156.80,
            date: "2025-11-09",
            method: "Cartão de Crédito",
            status: "pending"
        },
    ],

    // Métodos de pagamento
    paymentMethods: [
        { method: "PIX", amount: 18500.00, count: 125, percentage: 40.5 },
        { method: "Cartão de Crédito", amount: 15200.00, count: 89, percentage: 33.3 },
        { method: "Cartão de Débito", amount: 8930.50, count: 67, percentage: 19.6 },
        { method: "Dinheiro", amount: 3050.00, count: 28, percentage: 6.6 },
    ]
};

export default function Financial() {
    const [dateRange, setDateRange] = React.useState<string>("this-month");
    const [isLoading, setIsLoading] = React.useState(false);

    // Simular loading
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [dateRange]);

    const { summary, revenueByCategory, expensesByCategory, salesByBrand, recentTransactions, paymentMethods } = mockFinancialData;

    return (
        <div className="min-h-screen flex flex-col bg-background pb-8">
            {/* Cabeçalho */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 px-2 md:px-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary">Financeiro</h1>
                    <p className="text-muted-foreground">Controle completo das suas finanças</p>
                </div>

                <div className="flex items-center gap-4">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Hoje</SelectItem>
                            <SelectItem value="this-week">Esta Semana</SelectItem>
                            <SelectItem value="this-month">Este Mês</SelectItem>
                            <SelectItem value="last-month">Mês Passado</SelectItem>
                            <SelectItem value="this-year">Este Ano</SelectItem>
                            <SelectItem value="custom">Período Personalizado</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="gap-2">
                        <IconDownload className="h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6 mb-8">
                <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Receita Total
                        </CardTitle>
                        <IconCurrencyDollar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {isLoading ? <Skeleton className="h-8 w-24" /> : formatCurrency(summary.totalRevenue)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <IconTrendingUp className="h-3 w-3 text-green-600" />
                            +{summary.periodGrowth}% vs período anterior
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Despesas Totais
                        </CardTitle>
                        <IconReceipt className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {isLoading ? <Skeleton className="h-8 w-24" /> : formatCurrency(summary.totalExpenses)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <IconTrendingDown className="h-3 w-3 text-red-600" />
                            +8.2% vs período anterior
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Lucro Líquido
                        </CardTitle>
                        <IconDeviceFloppy className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {isLoading ? <Skeleton className="h-8 w-24" /> : formatCurrency(summary.netProfit)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <IconTrendingUp className="h-3 w-3 text-green-600" />
                            Margem: {summary.profitMargin}%
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden shadow-lg rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Transações
                        </CardTitle>
                        <IconCreditCard className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {isLoading ? <Skeleton className="h-8 w-16" /> : "309"}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <IconTrendingUp className="h-3 w-3 text-green-600" />
                            +12 vs período anterior
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Conteúdo Principal com Abas */}
            <div className="flex-1 px-2 md:px-6">
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="transactions">Transações</TabsTrigger>
                        <TabsTrigger value="categories">Categorias</TabsTrigger>
                        <TabsTrigger value="payments">Pagamentos</TabsTrigger>
                    </TabsList>

                    {/* Aba Visão Geral */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Receitas por Canal */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <IconShoppingCart className="h-5 w-5" />
                                        Receitas por Canal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {revenueByCategory.map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">{item.category}</span>
                                                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="w-full bg-muted rounded-full h-2 mr-4">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${item.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-bold text-green-600">
                                                    {formatCurrency(item.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Vendas por Marca */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <IconTrendingUp className="h-5 w-5" />
                                        Vendas por Marca
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Gráfico de Pizza */}
                                        <ChartContainer
                                            config={chartConfig}
                                            className="mx-auto aspect-square max-h-[300px]"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={salesByBrand.map((brand, index) => ({
                                                        ...brand,
                                                        fill: BRAND_COLORS[index] || BRAND_COLORS[4]
                                                    }))}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ brand, percentage }) => `${brand} ${percentage.toFixed(1)}%`}
                                                    outerRadius={80}
                                                    dataKey="amount"
                                                >
                                                    {salesByBrand.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={BRAND_COLORS[index] || BRAND_COLORS[4]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            const data = payload[0].payload;
                                                            return (
                                                                <div className="bg-white p-3 border rounded-lg shadow-md">
                                                                    <p className="font-semibold text-gray-900">{data.brand}</p>
                                                                    <p className="text-sm text-gray-600">
                                                                        Faturamento: {formatCurrency(data.amount)}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        Quantidade: {data.quantity} vendas
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        Participação: {data.percentage.toFixed(1)}%
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </PieChart>
                                        </ChartContainer>

                                        {/* Lista de marcas com detalhes */}
                                        <div className="space-y-3">
                                            {salesByBrand.map((brand, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{ backgroundColor: BRAND_COLORS[index] || BRAND_COLORS[4] }}
                                                        ></div>
                                                        <div>
                                                            <p className="text-sm font-semibold">{brand.brand}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {brand.quantity} vendas • {formatCurrency(brand.averagePrice)} médio
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">{formatCurrency(brand.amount)}</p>
                                                        <p className="text-xs text-primary">{brand.percentage.toFixed(1)}%</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Aba Transações */}
                    <TabsContent value="transactions" className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Transações Recentes</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <IconFilter className="h-4 w-4" />
                                        Filtros
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Eye className="h-4 w-4" />
                                        Ver Todas
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full ${transaction.type === 'revenue' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {transaction.type === 'revenue' ?
                                                        <IconTrendingUp className="h-4 w-4" /> :
                                                        <IconTrendingDown className="h-4 w-4" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-medium">{transaction.description}</p>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>{transaction.date}</span>
                                                        <span>•</span>
                                                        <span>{transaction.method}</span>
                                                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                                                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`text-lg font-bold ${transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {transaction.type === 'revenue' ? '+' : ''}{formatCurrency(transaction.amount)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Aba Categorias */}
                    <TabsContent value="categories" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Despesas por Categoria</CardTitle>
                                <CardDescription>
                                    Análise detalhada dos seus gastos por categoria
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {expensesByCategory.map((category, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{category.category}</span>
                                            <div className="text-right">
                                                <div className="font-bold text-red-600">{formatCurrency(category.amount)}</div>
                                                <div className="text-sm text-muted-foreground">{category.percentage}%</div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-3">
                                            <div
                                                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${category.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Aba Métodos de Pagamento */}
                    <TabsContent value="payments" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Métodos de Pagamento</CardTitle>
                                <CardDescription>
                                    Distribuição das vendas por forma de pagamento
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {paymentMethods.map((method, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                                <IconCreditCard className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{method.method}</p>
                                                <p className="text-sm text-muted-foreground">{method.count} transações</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-blue-600">{formatCurrency(method.amount)}</div>
                                            <div className="text-sm text-muted-foreground">{method.percentage}%</div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}