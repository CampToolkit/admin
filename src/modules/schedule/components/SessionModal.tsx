import LessonForm, {
  type LessonFormProps,
  type LessonFormValues,
} from "@/modules/schedule/components/LessonForm.tsx";
import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import { useEffect } from "react";

type Props = {
  formData: Omit<LessonFormProps, "onSubmit">;
  campId: number;
  onClose?: () => void;
};

export default function SessionModal({ formData, onClose }: Props) {
  const { openModal } = useModal();
  const onSubmit = (values: LessonFormValues) => {
    console.log(values);
    onClose?.();
  };
  const content = () => <LessonForm {...formData} onSubmit={onSubmit} />;

  useEffect(() => {
    openModal({
      content,
      showConfirmButton: false,
      showCancelButton: false,
    });
  }, []);
  return null;
}
