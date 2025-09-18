import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import LessonForm from "@/modules/schedule/ui/lesson-form/LessonForm.tsx";
import type {
  LessonFormOptions,
  LessonFormProps,
  LessonFormValues,
} from "@/modules/schedule/ui/lesson-form/lesson-form.type.ts";
import { EventApi } from "@/shared/api/event/EventApi.ts";

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

export function useEventModal({ campId, onClose }: UseSessionModalProps) {
  const { openModal, closeModal } = useModal();

  const handleSubmit: LessonFormProps["onSubmit"] = async (values) => {
    const newEvent = await EventApi.create({
      campId,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      lessonTypeId: values.lessonTypeId,
      activityTypeId: values.activityTypeId,
      auditoriumId: values.auditoriumId,
    });

    if (newEvent && values.coachId) {
      await EventApi.appointCoach({
        lessonId: newEvent.id,
        coachId: values.coachId,
        role: "PRIMARY",
      });
    }

    if (newEvent && values.groupId) {
      await EventApi.addGroup({
        lessonId: newEvent.id,
        groupId: values.groupId,
      });
    }
    // todo сообщение о успешном создании event
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
