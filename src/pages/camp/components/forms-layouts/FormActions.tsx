import { Stack, Button } from "@mui/material";

type PropsType = {
  saveCallback?: () => void;
  clearCallback?: (e: any) => void;
  formId?: string;
};

export default function FormActions(props: PropsType) {
  return (
    <Stack gap={1}>
      <Button
        form={props?.formId}
        type="submit"
        variant="contained"
        onClick={props?.saveCallback}
      >
        Сохранить
      </Button>
      <Button
        form={props?.formId}
        type="reset"
        color="error"
        variant="outlined"
        onClick={props?.clearCallback}
      >
        Очистить форму
      </Button>
    </Stack>
  );
}
