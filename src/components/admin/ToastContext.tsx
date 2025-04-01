import React, { createContext, useContext, useState } from 'react';
import Toast, { ToastVariant } from './Toast';

interface ToastContextProps {
  showToast: (message: string, variant: ToastVariant) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant; isVisible: boolean }>({
    message: '',
    variant: 'info',
    isVisible: false
  });

  const showToast = (message: string, variant: ToastVariant) => {
    setToast({ message, variant, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 