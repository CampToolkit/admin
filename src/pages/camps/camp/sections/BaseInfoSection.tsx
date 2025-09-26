import BaseInfoForm, {
  type BaseInfoFormValues,
} from "@/pages/camps/camp/forms/BaseInfoForm.tsx";
import { useParams } from "react-router-dom";
import { useCamp } from "@/pages/camps/hooks/use-camp.ts";
import dayjs from "dayjs";
import { CampApi } from "@/common/api/camp/CampApi.ts";

export default function BaseInfoSection() {
  const { campId } = useParams();
  const { camp } = useCamp(Number(campId));

  const onSubmit = async (data: BaseInfoFormValues) => {
    await CampApi.update(Number(campId), {
      ...camp,
      name: data.name,
      city: data.city,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
  };

  return (
    <div>
      <BaseInfoForm
        initialValues={{
          name: camp?.name ?? "",
          city: camp?.city ?? "",
          startDate: camp ? dayjs(camp.startDate) : dayjs(),
          endDate: camp ? dayjs(camp.endDate) : dayjs(),
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
