export function convertToBRL(value: string | number): string {
    const valueString = typeof value === 'number' ? value.toString() : value;
    
    const digitsOnly = valueString.replace(/\D/g, '');

    const formattedCurrency = (Number(digitsOnly) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return formattedCurrency;
}