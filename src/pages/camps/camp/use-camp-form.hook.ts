import { useFormik, type FormikProps } from "formik";

type SportsmanType = {
  lastName: string;
  firstName: string;
  patrName: string;
};

type GroupType = {
  name: string;
};

type LocationType = {
  name: string;
};

type CampType = {
  name: string;
  dateStart: string;
  dateEnd: string;
  city: string;
};

type SlotType = {
  startDate: "string";
  endDate: "string";
  slotTypeId: number;
  campId: number;
  auditoriumId: number;
};

export type CampFormValues = {
  camp: CampType;
  sportsmen: SportsmanType[];
  groups: GroupType[];
  locations: LocationType[];
};

interface UseCampFormProps {
  values: CampFormValues;
}

export type CampFormFormikType = FormikProps<CampFormValues>;

const initialValues: CampFormValues = {
  camp: {
    name: "",
    dateStart: "",
    dateEnd: "",
    city: "",
  },
  sportsmen: [{ lastName: "", firstName: "", patrName: "" }],
  groups: [{ name: "" }],
  locations: [{ name: "" }],
};

export function useCampForm(props?: UseCampFormProps): CampFormFormikType {
  const values = props?.values ?? initialValues;

  const formik = useFormik<CampFormValues>({
    initialValues: values,
    onSubmit: (values) => {
      console.log("Submitting form:", values);
    },
  });

  return formik;
}
