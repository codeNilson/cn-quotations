import { useEffect, useState } from 'react';
import type { PartResolved } from '../../models/Part';
import { fetchParts } from '../../service/PartService';
import type { QuotationCreateDTO } from '../../models/Quotation';
import { createQuotation } from '../../service/QuotationService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type QuotationFormProps = {
    mode: "create" | "edit";
    onCancel: () => void;
    defaultValues?: {
        referencia?: string;
        status?: string;
        fornecedor?: string;
        valor?: string;
    };
};

export default function QuotationForm({ mode, onCancel, defaultValues }: QuotationFormProps) {
    const [parts, setParts] = useState<PartResolved[]>([]);

    useEffect(() => {
        async function loadParts() {
            const data = await fetchParts();
            setParts(data);
        }
        loadParts();
    }, []);

    const [referencia, setReferencia] = useState(defaultValues?.referencia || '');
    const [status, setStatus] = useState(defaultValues?.status || 'pending');
    const [fornecedor, setFornecedor] = useState(defaultValues?.fornecedor || '');
    const [valor, setValor] = useState(defaultValues?.valor || '');

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (quotationData: QuotationCreateDTO) => createQuotation(quotationData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] })
            onCancel();
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const quotationData: QuotationCreateDTO = {
            reference: referencia,
            status: status,
            supplier: fornecedor,
            price: Number(valor.replace(/\D/g, ''))
        };

        try {
            await mutation.mutateAsync(quotationData);
        } catch (error) {
            console.error("Erro ao criar cotação:", error);
            alert("Erro ao criar cotação. Verifique o log.")
        }
    };

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/\D/g, '');

        const formatted = (Number(numbersOnly) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        setValor(formatted);
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
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
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
                        value={fornecedor}
                        onChange={(e) => setFornecedor(e.target.value)}
                        className="form-input"
                    />
                </label>

                <label>
                    <h3>Valor</h3>
                    <input
                        required
                        type="text"
                        value={valor}
                        onChange={onPriceChange}
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
