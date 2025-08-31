import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@mui/material";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

/**
 * Универсальная кнопка, открывающая модальное окно с переданным содержимым.
 *
 * @param {Object} props
 * @param {string} props.buttonText - Текст кнопки.
 * @param {() => ReactElement} props.children - Содержимое модального окна (например, форма или любой другой компонент).
 * @param {ButtonProps} [props.buttonProps] - Дополнительные пропсы для кнопки MUI.
 */
export function ModalActionButton({
  buttonText,
  children,
  buttonProps,
}: {
  buttonText: string;
  children: () => ReactNode;
  buttonProps?: ButtonProps;
}) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal({
      content: children,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ fontSize: 16 }}
      onClick={handleClick}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}
