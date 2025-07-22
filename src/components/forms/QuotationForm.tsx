import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { PartResolved } from '../../models/Part';
import type { QuotationCreateDTO, QuotationFormProps } from '../../models/Quotation';
import { fetchParts } from '../../service/PartService';
import { createQuotation, updateQuotation } from '../../service/QuotationService';
import { convertToBRL } from '../../utils/ConvertToBRL';

export default function QuotationForm({ mode, onCancel, onSuccess, defaultValues }: QuotationFormProps) {
    const [parts, setParts] = useState<PartResolved[]>([]);

    useEffect(() => {
        async function loadParts() {
            const data = await fetchParts();
            setParts(data);
        }
        loadParts();
    }, []);

    const [reference, setReference] = useState(defaultValues?.reference || '');
    const [status, setStatus] = useState(defaultValues?.status || 'pending');
    const [supplier, setSupplier] = useState(defaultValues?.supplier || '');
    const [price, setPrice] = useState(convertToBRL(defaultValues?.price || ''));

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: QuotationCreateDTO) => {
            if (mode === "create") {
                return await createQuotation(data);
            } else {
                if (!defaultValues?.id) {
                    throw new Error("ID da cotação não fornecido para edição.");
                }
                return await updateQuotation(defaultValues.id, data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            onSuccess?.();
            onCancel();
        },
        onError: (error) => {
            console.error("Erro ao processar cotação:", error);
            alert("Erro ao processar cotação. Verifique o log.");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const quotationData: QuotationCreateDTO = {
            reference: reference,
            status: status,
            supplier: supplier,
            price: Number(price.replace(/\D/g, ''))
        };

        try {
            await mutation.mutateAsync(quotationData);
        } catch (error) {
            console.error("Erro ao criar cotação:", error);
            alert("Erro ao criar cotação. Verifique o log.")
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/\D/g, '');

        const formatted = convertToBRL(numbersOnly);

        setPrice(formatted);
    };

    return (
        <form onSubmit={handleSubmit}>
            {mode === "create" ? (
                <>
                    <h2 className='form-title'>Criar Cotação</h2>
                    <p className='form-description'>Informe os dados da nova cotação.</p>
                </>
            ) : (
                <>
                    <h2 className='form-title'>Editar Cotação</h2>
                    <p className='form-description'>Atualize as informações desta cotação.</p>
                </>
            )}

            <div className="grid mt-3 grid-cols-1 md:grid-cols-2 gap-4">
                <label>
                    <h3>Referência</h3>
                    <select
                        required
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Selecione um peça</option>
                        {parts.map((part) => (
                            <option key={part.id} value={part.id}>{part.id}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <h3>Status</h3>
                    <select
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-input"
                    >
                        <option value="pending">Pendente</option>
                        <option value="approved">Aprovada</option>
                        <option value="rejected">Rejeitada</option>
                    </select>
                </label>

                <label>
                    <h3>Fornecedor</h3>
                    <input
                        required
                        type="text"
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        className="form-input"
                    />
                </label>

                <label>
                    <h3>Valor</h3>
                    <input
                        required
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="R$ 0,00"
                        className="form-input"
                    />
                </label>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn border border-gray-300 dark:border-neutral-600"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="btn btn-primary text-white"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Salvando...' : mode === "create" ? "Criar" : "Salvar"}
                </button>
            </div>
        </form>
    );
}
