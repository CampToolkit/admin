import { Button, Grid, Stack } from "@mui/material";
import { type ReactNode, useState } from "react";
import FormActions from "@/pages/camps/camp/components/forms-layouts/FormActions.tsx";

export interface FormSwitcherComponent {
  key: string;
  label: string;
  element: ReactNode;
}

interface Props {
  components: FormSwitcherComponent[];
}

export default function FormSwitcherLayout(props: Props) {
  const { components } = props;
  const [activeKey, setActiveKey] = useState<string>(components[0].key);

  const currentComponent = components.find((c) => c.key === activeKey);
  console.log("formSwitcherLayout", activeKey);
  return (
    <Grid
      container
      columnSpacing={3}
      sx={{
        height: "100%",
      }}
    >
      <Grid size={2}>
        <Stack>
          {components.map((component) => (
            <Button
              key={component.key}
              onClick={() => setActiveKey(component.key)}
              sx={{
                backgroundColor: () =>
                  component.key === activeKey ? "primary.50" : "",
              }}
            >
              {component.label}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Grid height="100%" size={8}>
        {currentComponent?.element}
      </Grid>
      <Grid size={2}>
        <FormActions formId={activeKey} />
      </Grid>
    </Grid>
  );
}
