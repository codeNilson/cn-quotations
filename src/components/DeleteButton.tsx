import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

export default function DeleteButton(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

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

  return (
    <>
      <button className="btn btn-icon" onClick={() => setShow(true)}>
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
            <p className="text-left text-sm">Isso irá excluir a cotação.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={close} className="btn border border-gray-200">
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
