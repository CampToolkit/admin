import { Stack, Box } from "@mui/material";

type TwoColumnLayoutPropsType = {
  left: React.ReactNode;
  right: React.ReactNode;
  spacing?: number;
  justifyContent?: string;
  alignItems?: string;
};

export default function TabSlitLayout(props: TwoColumnLayoutPropsType) {
  return (
    <Stack
      direction="row"
      spacing={props.spacing ?? 2}
      justifyContent={props.justifyContent}
      alignItems={props.alignItems}
      sx={{
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 2 }}>{props.left}</Box>
      <Box>{props.right}</Box>
    </Stack>
  );
}
