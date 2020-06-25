import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextProps {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface ToastMessage {
  id: string;
  type?: 'error' | 'info' | 'success';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description
      };

      setMessages(current => [...current, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages(current => current.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Hook useToast must be used within a ToastProvider');
  }

  return context;
};
