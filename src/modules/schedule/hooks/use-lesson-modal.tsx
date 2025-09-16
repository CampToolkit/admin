import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import LessonForm from "@/modules/schedule/ui/lesson-form/LessonForm.tsx";
import type {
  LessonFormOptions,
  LessonFormProps,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import { LessonApi } from "@/shared/api/lesson/LessonApi.ts";

type UseSessionModalProps = {
  campId: number;
  onClose?: () => void;
};

type OpenModalParams = {
  formData: {
    formId: string;
    initialValues: LessonFormValues;
  };
  options: LessonFormOptions;
};

export function useLessonModal({ campId, onClose }: UseSessionModalProps) {
  const { openModal, closeModal } = useModal();

  const handleSubmit: LessonFormProps["onSubmit"] = async (values) => {
    const response = await LessonApi.create({
      campId,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      lessonTypeId: values.lessonTypeId,
      activityTypeId: values.activityTypeId,
      auditoriumId: values.auditoriumId,
    });
    console.log(response);
    onClose?.();
    closeModal();
  };

  const open = ({ formData, options }: OpenModalParams) => {
    const content = () => (
      <LessonForm {...formData} options={options} onSubmit={handleSubmit} />
    );

    openModal({
      content,
      showConfirmButton: true,
      showCancelButton: true,
      formId: formData.formId,
    });
  };

  return { open };
}
