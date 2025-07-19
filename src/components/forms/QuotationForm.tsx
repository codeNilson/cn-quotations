import { useState } from 'react';

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
    const [referencia, setReferencia] = useState(defaultValues?.referencia || '');
    const [status, setStatus] = useState(defaultValues?.status || 'pending');
    const [fornecedor, setFornecedor] = useState(defaultValues?.fornecedor || '');
    const [valor, setValor] = useState(defaultValues?.valor || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ referencia, status, fornecedor, valor });
    };

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const numbersOnly = value.replace(/\D/g, '');

        const formatted = (Number(numbersOnly) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        setValor(formatted);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === "create" ? "Criar Cotação" : "Editar Cotação"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label>
                    <h3>Referência</h3>
                    <input
                        type="text"
                        required
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        className="focus:outline-none focus:ring-2  focus:ring-orange-500 focus:border-orange-500 border border-gray-300 dark:border-neutral-600 rounded-md px-2 py-1 bg-white dark:bg-neutral-800"
                    />
                </label>

                <label>
                    <h3>Status</h3>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="focus:outline-none focus:ring-2  focus:ring-orange-500 focus:border-orange-500 border border-gray-300 dark:border-neutral-600 rounded-md px-2 py-1 bg-white dark:bg-neutral-800"
                    >
                        <option value="">Selecione um status</option>
                        <option value="pending">Pendente</option>
                        <option value="approved">Aprovada</option>
                        <option value="rejected">Rejeitada</option>
                    </select>
                </label>

                <label>
                    <h3>Fornecedor</h3>
                    <input
                        type="text"
                        value={fornecedor}
                        required
                        onChange={(e) => setFornecedor(e.target.value)}
                        className="focus:outline-none focus:ring-2  focus:ring-orange-500 focus:border-orange-500 border border-gray-300 dark:border-neutral-600 rounded-md px-2 py-1 bg-white dark:bg-neutral-800"
                    />
                </label>

                <label>
                    <h3>Valor</h3>
                    <input
                        type="text"
                        value={valor}
                        required
                        onChange={onPriceChange}
                        placeholder="R$ 0,00"
                        className="focus:outline-none focus:ring-2  focus:ring-orange-500 focus:border-orange-500 border border-gray-300 dark:border-neutral-600 rounded-md px-2 py-1 bg-white dark:bg-neutral-800"
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
                >
                    {mode === "create" ? "Criar" : "Salvar"}
                </button>
            </div>
        </form>
    );
}