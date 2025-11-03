"use client";

import * as React from "react";
import { ColumnDef, flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import { Badge } from "@/components/ui/badge";

export type Sale = {
    id: string;
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
        { accessorKey: "id", header: "ID" },
        { accessorKey: "customerName", header: "Cliente" },
        {
            accessorKey: "createdAt",
            header: "Data",
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR")
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => {
                const total = row.getValue("total");
                return formatCurrency(String(total))
            }
        },
        {
            accessorKey: "profit",
            header: "Lucro",
            cell: ({ row }) => {
                const profit = row.getValue("profit");
                return formatCurrency(String(profit))
            }
        }, 
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const statusMap: Record<string, { label: string; color: "success" | "warning" | "destructive" }> = {
                    Approved: { label: "Aprovada", color: "success" },      // verde
                    Pending: { label: "Pendente", color: "warning" },       // amarelo
                    Canceled: { label: "Cancelada", color: "destructive" }, // vermelho
                };

                const status = row.getValue("status");
                const statusInfo = statusMap[status] || { label: status, color: "default" };

                return (
                    <Badge variant="outline" className="capitalize" color={statusInfo.color}>
                        {statusInfo.label}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <Button variant="ghost" size="sm">
                    <Eye />
                </Button>
            )
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
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Nenhuma venda encontrada.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
