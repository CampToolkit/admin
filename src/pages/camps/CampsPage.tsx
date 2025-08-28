import { useEffect, useState } from "react";

import {
  MenuItem,
  Box,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import BaseTile from "@/shared/components/tile/BaseTile";
import PageTitle from "@/shared/components/PageTitle";

import NewCamp from "./camp/NewCamp";
import { CampApi } from "@/shared/api/api-services.ts";

const CAMP_FILTER_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "current", label: "Текущие" },
  { value: "finished", label: "Завершенные" },
] as const;

type CampFilterValue = (typeof CAMP_FILTER_OPTIONS)[number]["value"];

export default function CampsPage() {
  const [camps, setCamps] = useState([]);
  const [campsFilterStatus, setCampsFilterStatus] =
    useState<CampFilterValue>("all");

  const handleFilterCamps = (event: SelectChangeEvent<CampFilterValue>) => {
    setCampsFilterStatus(event.target.value as CampFilterValue);
  };

  async function getCamps() {
    const camps = await CampApi.getAll();
    console.log(camps.data);
    setCamps(camps);
  }

  useEffect(() => {
    getCamps();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ mb: 5 }}>
        <NewCamp />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          mb: 2,
        }}
      >
        <PageTitle title="Сборы" sx={{ m: 0 }} />
        <Select
          labelId="status-select-label"
          value={campsFilterStatus}
          onChange={handleFilterCamps}
          sx={{ width: "100%", maxWidth: 200 }}
        >
          {CAMP_FILTER_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <BaseTile
        sx={{
          bgcolor: "background.paper",
          color: "text.contrast",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Создать сбор</Typography>
        </Box>
      </BaseTile>
    </div>
  );
}
