import { Button, Stack } from "@mui/material";

export default function LoadButtonsStack() {
  return (
    <Stack gap={1} mb={3}>
      <Button variant="outlined">Загрузить из файла</Button>
      <Button variant="outlined">Загрузить из базы данных</Button>
    </Stack>
  );
}
