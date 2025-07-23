import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteQuotation } from '../hooks/useDelete';
import { useDeletePart } from '../hooks/usePartMutations';
import type { DeleteButtonProps } from '../types/components';
import React from "react";

export default function DeleteButton({ itemId, itemType = "cotação", onDelete }: DeleteButtonProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  
  const deleteQuotationMutation = useDeleteQuotation();
  const deletePartMutation = useDeletePart();
  
  // Use the appropriate mutation based on itemType
  const deleteMutation = itemType === "peça" ? deletePartMutation : deleteQuotationMutation;

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setOpen(true), 10);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const close = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!itemId) {
      console.error("ID não encontrado. Não é possível excluir o item.");
      return;
    }
    
    try {
      await deleteMutation.mutateAsync(itemId);
      onDelete?.(); // Call callback if provided
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return (
    <>
      <button 
        className="btn btn-icon" 
        onClick={() => setOpen(true)}
        disabled={deleteMutation.isPending}
      >
        <FontAwesomeIcon icon={faTrash} className="icon-delete" />
      </button>

      {show && (
        <div
          className={`fixed inset-0 flex items-center p-3 justify-center bg-black/75 transition-opacity duration-200 z-50 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`bg-white dark:bg-neutral-900 dark:text-white p-6 rounded shadow w-full max-w-md ${open ? "scale-100" : "scale-95"}`}>
            <h2 className="text-xl font-bold mb-2 text-left">Tem certeza?</h2>
            <p className="text-left text-sm">Isso irá excluir a {itemType} permanentemente.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={close} 
                className="btn border border-gray-200"
                disabled={deleteMutation.isPending}
              >
                Cancelar
              </button>
              <button 
                className="btn bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
