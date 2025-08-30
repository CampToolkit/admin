import { Stack, Button } from "@mui/material";

type PropsType = {
  saveCallback: () => void;
  clearCallback: (e: any) => void;
};

export default function FormActions(props: PropsType) {
  return (
    <Stack gap={1}>
      <Button type="submit" variant="contained" onClick={props.saveCallback}>
        Сохранить
      </Button>
      <Button
        type="reset"
        color="error"
        variant="outlined"
        onClick={props.clearCallback}
      >
        Очистить форму
      </Button>
    </Stack>
  );
}
