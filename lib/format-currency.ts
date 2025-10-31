export function formatCurrency(value: number | string): string {
  let numberValue = typeof value === "string" ? parseFloat(value) : value;

  // 💡 Se for um valor inteiro grande, divide por 100 (supõe centavos)
  if (numberValue > 999) {
    numberValue = numberValue / 100;
  }

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
