import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import NewSportsmenForm from "@/pages/camps/camp/components/add-to-camp-modal-layout/NewSportsmenFormTest.tsx";
import CheckPersonTableForm from "@/pages/camps/camp/components/check-tables/CheckPersonTable.tsx";

export default function AddToCampLayout() {
  const [formIndex, setFormIndex] = useState<number>(0);

  const switchForm = (index: number) => {
    setFormIndex(index);
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        maxHeight: "100vh",
      }}
    >
      <Grid size={2} border={1}>
        <Stack>
          <Button onClick={() => switchForm(0)}>
            Загрузить из базы данных
          </Button>
          <Button onClick={() => switchForm(1)}>Создать</Button>
        </Stack>
      </Grid>
      <Grid size={8} border={1}>
        {formIndex === 1 && (
          <NewSportsmenForm
            initialValues={{
              items: [{ lastName: "", firstName: "", patrName: "" }],
            }}
            onSubmit={() => {}}
            formId="form0"
          />
        )}

        {formIndex === 0 && (
          <CheckPersonTableForm
            onSubmit={() => {}}
            persons={[
              { id: 1, lastName: "tes", firstName: "tes", patrName: "tes" },
            ]}
            formId="form1"
          />
        )}
      </Grid>
      <Grid size={2} border={1}>
        <Stack>
          <Button form={`form${formIndex}`} type="submit">
            Сохранить
          </Button>
          <Button form={`form${formIndex}`} type="reset">
            Очистить
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
