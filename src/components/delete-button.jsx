import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteButton() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // Quando abrir, monta o modal e com um delay curto ativa open
  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      // fecha animado, desmonta depois
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Força open só após modal estar montado
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setOpen(true), 10);
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Botão fechar (desativa open, que vai iniciar saída)
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="btn btn-icon" onClick={() => setShow(true)}>
        <FontAwesomeIcon icon={faTrash} className="icon-delete" />
      </button>

      {show && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/75 transition-opacity duration-200 z-50 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`bg-white p-6 rounded shadow w-full max-w-md transform transition-all duration-200 ${
              open ? "scale-100" : "scale-95"
            }`}
          >
            <h2 className="text-xl font-bold mb-2 text-left">Tem certeza?</h2>
            <p className="text-left text-gray-600 text-sm">Isso irá excluir a cotação.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={close} className="btn text-black border border-gray-200">
                Fechar
              </button>
              <button className="btn bg-red-500 text-white">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
