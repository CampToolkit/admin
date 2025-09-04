import { Button, Grid, Stack } from "@mui/material";
import { type ReactNode, useState } from "react";

interface Component {
  key: string;
  label: string;
  element: ReactNode;
}

interface Props {
  components: Component[];
}

export default function FormSwitcherLayout(props: Props) {
  const { components } = props;
  const [activeKey, setActiveKey] = useState<string>(components[0].key);

  const currentComponent = components.find((c) => c.key === activeKey);

  return (
    <Grid
      container
      sx={{
        height: "100%",
      }}
    >
      <Grid size={2} border={1}>
        <Stack>
          {components.map((component) => (
            <Button
              key={component.key}
              onClick={() => setActiveKey(component.key)}
            >
              {component.label}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Grid size={8} border={1}>
        {currentComponent?.element}
      </Grid>
      <Grid size={2} border={1}>
        <Stack>
          <Button form={activeKey} type="submit">
            Сохранить
          </Button>
          <Button form={activeKey} type="reset">
            Очистить
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
