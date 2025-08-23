import { Stack, Button } from "@mui/material";

type PropsType = {
  saveCallback: () => void;
  clearCallback: () => void;
};

export default function ManageFormButtonsBlock(props: PropsType) {
  return (
    <Stack gap={1}>
      <Button type="submit" variant="contained" onClick={props.saveCallback}>
        Сохранить
      </Button>
      <Button color="error" variant="outlined" onClick={props.saveCallback}>
        Очистить форму
      </Button>
    </Stack>
  );
}
