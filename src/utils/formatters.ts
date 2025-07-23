/**
 * Formata um valor numérico ou string para o formato de moeda brasileira (R$)
 * @param value - O valor a ser formatado (number, string ou undefined)
 * @returns String formatada em R$ ou '-' se valor inválido
 */
export function formatCurrency(value: number | string | undefined): string {
    if (!value || value === '' || value === '0' || value === 0) {
        return '-';
    }

    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.')) : value;
    
    if (isNaN(numValue)) {
        return '-';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numValue);
}

/**
 * Converte um valor formatado em R$ de volta para número
 * @param formattedValue - Valor formatado (ex: "R$ 1.234,56")
 * @returns Número ou 0 se inválido
 */
export function parseCurrency(formattedValue: string): number {
    if (!formattedValue) return 0;
    
    const cleanValue = formattedValue
        .replace(/[^\d,]/g, '') // Remove tudo exceto dígitos e vírgula
        .replace(',', '.'); // Converte vírgula para ponto
    
    return parseFloat(cleanValue) || 0;
}
