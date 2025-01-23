
export function calculatePercentage(discountValue: number, customPrice: number) {
    const total = discountValue + customPrice;
    const percentage = (discountValue / total) * 100;

    return percentage
    
}