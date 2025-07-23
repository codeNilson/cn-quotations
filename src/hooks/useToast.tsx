import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: 'ℹ️',
    });
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  // Backward compatibility
  const success = showSuccess;
  const error = showError;
  const info = showInfo;

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    dismiss,
    success,
    error,
    info,
  };
};
