"use client";

import * as React from "react";
import { ColumnDef, flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/format-currency";
import { SaleDetailsDialog } from "./sale-details-dialog";
import { CheckCircle, XCircle, Clock, ShoppingCart } from "lucide-react";

export type Sale = {
    id: string;
    orderNumber: string;
    customerName: string;
    createdAt: string;
    total: number;
    profit: number;
    status: string;
};

interface SaleTableProps {
    sales: Sale[];
}

export const SaleTable: React.FC<SaleTableProps> = ({ sales }) => {
    const columns: ColumnDef<Sale>[] = [
        { accessorKey: "orderNumber", header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pedido</span> },
        { accessorKey: "customerName", header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cliente</span> },
        {
            accessorKey: "createdAt",
            header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Data</span>,
            cell: ({ row }) => <span className="whitespace-nowrap text-xs">{new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR")}</span>
        },
        {
            accessorKey: "total",
            header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</span>,
            cell: ({ row }) => {
                const total = row.getValue("total");
                return <span className="font-semibold text-primary">{formatCurrency(String(total))}</span>
            }
        },
        {
            accessorKey: "profit",
            header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lucro</span>,
            cell: ({ row }) => {
                const profit = row.getValue("profit");
                return <span className="text-green-600 font-medium">{formatCurrency(String(profit))}</span>
            }
        },
        {
            accessorKey: "status",
            header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</span>,
            cell: ({ row }) => {
                const status = String(row.getValue("status")).toLowerCase();
                if (status === "approved")
                    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold"><CheckCircle className="w-4 h-4" /> Pago</span>;
                if (status === "pending")
                    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold"><Clock className="w-4 h-4" /> Pendente</span>;
                return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold"><XCircle className="w-4 h-4" /> Cancelado</span>;
            },
        },
        {
            id: "actions",
            header: () => <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ações</span>,
            cell: ({ row }) => {
                const sale = row.original;
                return (
                    <div className="flex items-center justify-center">
                        <SaleDetailsDialog sale={sale} />
                    </div>
                );
            },
        }
    ];

    const table = useReactTable({
        data: sales,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className="bg-muted/40">
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                className={
                                    `transition-all hover:bg-primary/5 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`
                                }
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className="py-3 px-2 text-sm">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="p-0">
                                <EmptyState
                                    icon={ShoppingCart}
                                    title="Nenhuma venda encontrada"
                                    description="Ainda não há vendas registradas. Que tal fazer a primeira venda?"
                                    className="py-12"
                                />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
