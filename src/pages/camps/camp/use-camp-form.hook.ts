import { useFormik, type FormikProps } from "formik";

type Sportsman = {
  lastName: string;
  firstName: string;
  patrName: string;
};

type Group = {
  name: string;
};

type CampType = {
  name: string;
  dateStart: string;
  dateEnd: string;
  city: string;
};

export type CampFormValues = {
  camp: CampType;
  sportsmen: Sportsman[];
  groups: Group[];
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
