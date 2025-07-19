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

    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === "create" ? "Criar Cotação" : "Editar Cotação"}</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <label>
                    <h3>Referência</h3>
                    <input 
                        type="text" 
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-800" 
                    />
                </label>
                
                <label>
                    <h3>Status</h3>
                    <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-800"
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
                        onChange={(e) => setFornecedor(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-800" 
                    />
                </label>
                
                <label>
                    <h3>Valor</h3>
                    <input 
                        type="text" 
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="R$ 0,00"
                        className="w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-800" 
                    />
                </label>
            </div>
            
            <div className="flex gap-2 mt-4">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="btn border"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    {mode === "create" ? "Criar" : "Salvar"}
                </button>
            </div>
        </form>
    );
}