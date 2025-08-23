import { FormikProvider } from "formik";
import { Stack, Box, Button } from "@mui/material";

import TabLayout from "../components/TabLayout";
import LeftLayoutItem from "../components/LeftLayoutItem";
import RightLayoutItem from "../components/RightLayoutItem";

import type { TabPropsType } from "../CampForm";
import ManageFormButtonsBlock from "../components/ManageFormButtonsBlock";

export default function Schedule({ formik }: TabPropsType) {
  return (
    <TabLayout>
      <FormikProvider value={formik}>
        <LeftLayoutItem>
          <Box component="form" onSubmit={formik.handleSubmit}></Box>
        </LeftLayoutItem>

        <RightLayoutItem>
          <>
            <Stack gap={1} mb={3}>
              <Button variant="outlined">Загрузить из файла</Button>
              <Button variant="outlined">Загрузить из базы данных</Button>
            </Stack>

            <ManageFormButtonsBlock
              saveCallback={formik.handleSubmit}
              clearCallback={formik.handleReset}
            />
          </>
        </RightLayoutItem>
      </FormikProvider>
    </TabLayout>
  );
}
