import {
  Card,
  CardContent,
  Typography,
  Grid,
  lighten,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { baseTheme } from "@/app/providers/theme/base-theme.ts";

import { type Dayjs } from "dayjs";

interface Props {
  startDate: Dayjs;
  groupName: string;
  coachName: string;
  campLocationName: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PointTitle = ({ children }: { children: string }) => (
  <span style={{ color: "#666", display: "inline" }}>{children}</span>
);

export default function EventCard(props: Props) {
  const {
    startDate,
    coachName,
    campLocationName,
    groupName,
    onEdit,
    onDelete,
  } = props;

  return (
    <Card variant="elevation" sx={{ height: "100%" }}>
      <CardContent
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          p: "0.9em",
          fontSize: "0.9em",
          flexGrow: 2,
          backgroundColor: `${lighten(baseTheme.palette.primary.light, 0.7)}`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0.1em",
            right: "0.1em",
          }}
        >
          <IconButton size="small" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon fontSize="small" onClick={onDelete} />
          </IconButton>
        </Box>
        <Grid container spacing={0.3}>
          <Grid size={12}>
            <Typography variant="body2">
              <PointTitle>Время</PointTitle> {startDate.format("HH:mm")}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2">
              <PointTitle>Тренер</PointTitle> {coachName}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <PointTitle>Группа</PointTitle> {groupName}
            </Typography>
          </Grid>
          <Grid size={6} p={0}>
            <Typography variant="body2">
              <PointTitle>Локация</PointTitle> {campLocationName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
