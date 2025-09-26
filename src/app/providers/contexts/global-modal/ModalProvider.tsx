import { useState, type ReactNode } from "react";
import { ModalContext } from "./use-modal.hook";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

import type { ModalOptions } from "./use-modal.hook.ts";

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  /**
   * @param options Аргументы модального окна
   *  - title: заголовок модалки (необязательно)
   *  - content: содержимое модального окна (ReactNode)
   *  - onConfirm: callback при нажатии "Подтвердить" (необязательно)
   *  - onCancel: callback при нажатии "Отмена" (необязательно)
   *  - showConfirmButton: показывать ли кнопку "Подтвердить" (по умолчанию true)
   *  - showCancelButton: показывать ли кнопку "Отмена" (по умолчанию true)
   */
  const openModal = (options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalOptions(null);
  };

  const handleConfirm = () => {
    modalOptions?.onConfirm?.();
  };

  const handleCancel = () => {
    modalOptions?.onCancel?.();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalOptions && (
        <Modal
          open={isOpen}
          onClose={handleCancel}
          aria-labelledby="global-modal-title"
          aria-describedby="global-modal-content"
        >
          <Box
            sx={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              display: "flex",
              flexDirection: "column",

              width: "90vw",
              height: "90vh",
              maxHeight: "90vh",
              overflow: "hidden",

              p: 4,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            {/* note заголовок */}
            {modalOptions.title && (
              <Typography
                id="global-modal-title"
                variant="h6"
                gutterBottom
                sx={{ flex: "0 0 auto" }}
              >
                {modalOptions.title}
              </Typography>
            )}
            {/* note тело */}
            <Stack
              id="global-modal-content"
              sx={{
                flex: "1 1 auto",
                minHeight: 0,
              }}
            >
              {modalOptions?.content && modalOptions.content()}
            </Stack>

            {/* note подвал */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ flex: "0 0 auto", justifyContent: "flex-end" }}
            >
              {modalOptions.showCancelButton !== false && (
                <Button variant="outlined" onClick={handleCancel}>
                  Отмена
                </Button>
              )}
              {modalOptions.showConfirmButton !== false && (
                <Button
                  form={modalOptions?.formId}
                  type={modalOptions?.formId ? "submit" : "button"}
                  variant="contained"
                  onClick={handleConfirm}
                >
                  {modalOptions?.formId ? "Сохранить" : "Подтвердить"}
                </Button>
              )}
            </Stack>
          </Box>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
