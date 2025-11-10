"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, User, Phone, CalendarDays, BadgeDollarSign, CheckCircle, XCircle, Clock, Trash2, RotateCcw } from "lucide-react";
import { useDeleteOrder, useUpdateOrderStatus } from "../hooks/use-order-actions";
import { toast } from "sonner";
import { useState } from "react";

// Helper para status badge (declarado fora da função principal, logo após os imports)
function StatusBadge({ status }: { status: string }) {
    if (status === "approved")
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold"><CheckCircle className="w-4 h-4" /> Pago</span>;
    if (status === "pending")
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold"><Clock className="w-4 h-4" /> Pendente</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold"><XCircle className="w-4 h-4" /> Cancelado</span>;
}
import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";

interface SaleDetailsDialogProps {
    sale: {
        id: string;
        orderNumber: string;
        customerName: string;
        customerPhone?: string;
        createdAt: string;
        total: number;
        status: string;
        products?: {
            id: string;
            name: string;
            quantity: number;
            price: number;
            image: string;
        }[];
    };
}

export function SaleDetailsDialog({ sale }: SaleDetailsDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = useState(sale.status);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const deleteOrderMutation = useDeleteOrder();
    const updateStatusMutation = useUpdateOrderStatus();

    console.log("sale chegando nos detalhes", sale)

    const handleDeleteOrder = async () => {
        try {
            await deleteOrderMutation.mutateAsync(sale.id);
            toast.success('Venda deletada com sucesso!');
            setOpen(false);
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Erro ao deletar venda');
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await updateStatusMutation.mutateAsync({
                orderId: sale.id,
                status: selectedStatus
            });
            toast.success('Status atualizado com sucesso!');
            setOpen(false);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Erro ao atualizar status');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-muted-foreground hover:text-primary"
            >
                <Eye className="w-5 h-5" />
            </Button>

            <DialogContent className="max-w-lg p-0 max-h-[80vh] overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2 border-b">
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <BadgeDollarSign className="w-5 h-5 text-primary" /> Detalhes da venda
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">Pedido #{sale.orderNumber}</DialogDescription>
                </DialogHeader>

                <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[60vh]">
                    {/* Cliente e status */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{sale.customerName}</span>
                        </div>
                        {sale.customerPhone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{sale.customerPhone}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span>{new Date(sale.createdAt).toLocaleString("pt-BR")}</span>
                        </div>
                        <StatusBadge status={sale.status} />
                    </div>

                    {/* Itens do pedido */}
                    <div>
                        <p className="font-semibold mb-3">Itens do pedido:</p>
                        <ul className="divide-y divide-muted-foreground/10 max-h-[40vh] overflow-y-auto pr-2">
                            {sale?.products?.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-3 py-3"
                                >
                                    <Image src={item.image} width={60} height={60} alt={item.name} className="rounded-md border" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                                        <p className="text-xs text-muted-foreground">{formatCurrency(item.price)} un.</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Total e lucro */}
                    <div className="border-t pt-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-primary">{formatCurrency(sale.total)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span>Lucro estimado:</span>
                            <span className="text-green-600">{formatCurrency(sale.total * 0.3)}</span>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="border-t pt-4 space-y-4">
                        <h4 className="font-semibold text-sm">Ações:</h4>

                        {/* Atualizar status - apenas para pedidos pendentes */}
                        {sale.status === "pending" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Atualizar status:</label>
                                <div className="flex gap-2">
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger className="flex-1">
                                            <SelectValue placeholder="Selecionar status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pendente</SelectItem>
                                            <SelectItem value="approved">Pago</SelectItem>
                                            <SelectItem value="cancelled">Cancelado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={handleUpdateStatus}
                                        disabled={selectedStatus === sale.status || updateStatusMutation.isPending}
                                        size="sm"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-1" />
                                        {updateStatusMutation.isPending ? 'Atualizando...' : 'Atualizar'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Deletar venda */}
                        <div className="space-y-2">
                            {!showDeleteConfirm ? (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="w-full"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Deletar venda
                                </Button>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Tem certeza que deseja deletar esta venda? Esta ação não pode ser desfeita.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="flex-1"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleDeleteOrder}
                                            disabled={deleteOrderMutation.isPending}
                                            className="flex-1"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {deleteOrderMutation.isPending ? 'Deletando...' : 'Confirmar'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
