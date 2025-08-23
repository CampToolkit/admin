import { useFormik, type FormikProps } from "formik";

export interface CampFormValues {
  name: string;
  dateStart: string | null;
  dateEnd: string | null;
  city: string | null;
}

interface UseCampFormProps {
  values: CampFormValues;
}

export type CampFormFormikType = FormikProps<CampFormValues>;

const initialValues: CampFormValues = {
  name: "",
  dateStart: null,
  dateEnd: null,
  city: null,
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
