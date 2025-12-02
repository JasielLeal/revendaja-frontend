'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTarget, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { formatCurrency } from "@/lib/format-currency";

interface FinancialGoal {
    id: string;
    title: string;
    target: number;
    current: number;
    progress: number;
    period: string;
    type: 'revenue' | 'profit' | 'sales';
    status: 'on-track' | 'behind' | 'ahead';
}

interface FinancialGoalsProps {
    goals: FinancialGoal[];
    isLoading?: boolean;
}

export function FinancialGoals({ goals, isLoading = false }: FinancialGoalsProps) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconTarget className="h-5 w-5" />
                        Metas Financeiras
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-muted rounded w-full mb-1"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconTarget className="h-5 w-5" />
                    Metas Financeiras
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {goals.map((goal) => (
                    <div key={goal.id} className="space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h4 className="font-medium">{goal.title}</h4>
                                <p className="text-sm text-muted-foreground">{goal.period}</p>
                            </div>
                            <Badge
                                variant={goal.status === 'on-track' ? 'default' : goal.status === 'ahead' ? 'default' : 'secondary'}
                                className={`${goal.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                                        goal.status === 'ahead' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                    }`}
                            >
                                {goal.status === 'on-track' ? (
                                    <>No Caminho <IconTrendingUp className="h-3 w-3 ml-1" /></>
                                ) : goal.status === 'ahead' ? (
                                    <>Acima da Meta <IconTrendingUp className="h-3 w-3 ml-1" /></>
                                ) : (
                                    <>Abaixo da Meta <IconTrendingDown className="h-3 w-3 ml-1" /></>
                                )}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="w-full bg-muted rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all duration-500 ${goal.status === 'on-track' ? 'bg-blue-500' :
                                            goal.status === 'ahead' ? 'bg-green-500' :
                                                'bg-red-500'
                                        }`}
                                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                                </span>
                                <span className="font-medium">
                                    {goal.progress.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {goals.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <IconTarget className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhuma meta definida ainda.</p>
                        <p className="text-sm">Configure suas metas para acompanhar o progresso!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}