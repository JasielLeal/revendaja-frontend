export function formatCurrency(value: number | string): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  // 💡 Sempre considera que o valor está em centavos
  const amount = numberValue / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
