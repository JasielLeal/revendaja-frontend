export const formatCurrency = (value: string) => {
    // Remove todos os caracteres não numéricos
    const cleanValue = value.replace(/\D/g, "");

    // Converte para número e formata
    const formattedValue = (Number(cleanValue) / 100).toFixed(2);

    // Converte para formato monetário
    return formattedValue.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
