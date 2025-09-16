import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";
import LessonForm from "@/modules/schedule/ui/LessonForm.tsx";

import type {
  LessonFormValues,
  LessonFormProps,
} from "@/modules/schedule/ui/LessonForm.tsx";
import type { LessonType } from "@/shared/api/lesson-type/LessonTypeApi.type.ts";
import type { ActivityType } from "@/shared/api/activity-type/ActivityTypeApi.type.ts";
import type { Group } from "@/shared/api/group/GroupApi.type.ts";
import type { Coach } from "@/shared/api/coach/CoachApi.type.ts";

type UseSessionModalProps = {
  campId: number;
  onClose?: () => void;
};

type OpenModalParams = {
  formData: {
    formId: string;
    initialValues: LessonFormValues;
  };
  options: {
    lessonTypeOptions: LessonType[];
    activityTypeOptions: ActivityType[];
    groupOptions: Group[];
    coachOptions: Coach[];
  };
};

export function useLessonModal({ campId, onClose }: UseSessionModalProps) {
  const { openModal, closeModal } = useModal();

  const handleSubmit: LessonFormProps["onSubmit"] = (values) => {
    console.log("Submit:", values, "campId:", campId);
    onClose?.();
    closeModal();
  };

  const open = ({ formData, options }: OpenModalParams) => {
    const content = () => (
      <LessonForm {...formData} {...options} onSubmit={handleSubmit} />
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
