import { createContext, useContext, type ReactNode } from "react";

export type ModalOptions = {
  title?: string;
  content: () => ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  formId?: string;
};

type ModalContextType = {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
