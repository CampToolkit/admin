import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import LessonForm from "@/modules/schedule/ui/lesson-form/LessonForm.tsx";
import type {
  LessonFormOptions,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";

type OpenModalParams = {
  formData: {
    formId: string;
    initialValues: LessonFormValues;
  };
  options: LessonFormOptions;
  onSubmit: (values: LessonFormValues) => void;
};

export function useEventModal() {
  const { openModal, closeModal } = useModal();

  const open = ({ formData, options, onSubmit }: OpenModalParams) => {
    const content = () => (
      <LessonForm {...formData} options={options} onSubmit={onSubmit} />
    );

    openModal({
      content,
      showConfirmButton: true,
      showCancelButton: true,
      formId: formData.formId,
    });
  };

  return { open, close: closeModal };
}
