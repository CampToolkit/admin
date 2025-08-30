import { useState } from "react";

import {
  MenuItem,
  Box,
  Select,
  type SelectChangeEvent,
  Typography,
  Grid,
} from "@mui/material";

import PageTitle from "@/shared/components/PageTitle";

import CreateCampButton from "./camp/components/CreateCampButton.tsx";

import { useCamps } from "@/pages/camps/hooks/use-camps.hook.ts";
import BaseAspectCard from "@/shared/components/BaseAspectCard.tsx";
import dayjs from "dayjs";
import { formatDate } from "@/shared/utils/formatDate.ts";
import { Link } from "react-router-dom";

const CAMP_FILTER_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "current", label: "Текущие" },
  { value: "finished", label: "Завершенные" },
] as const;

type CampFilterValue = (typeof CAMP_FILTER_OPTIONS)[number]["value"];

export default function CampsPage() {
  const { camps, refreshCamps } = useCamps();
  const [campsFilterStatus, setCampsFilterStatus] =
    useState<CampFilterValue>("all");

  const handleFilterCamps = (event: SelectChangeEvent<CampFilterValue>) => {
    setCampsFilterStatus(event.target.value as CampFilterValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ mb: 5 }}>
        <CreateCampButton onCampCreated={refreshCamps} />
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
          size={"small"}
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

      <Grid container spacing={2}>
        {camps.map((camp) => (
          <Link to={`/camps/${camp.id}`} style={{ textDecoration: "none" }}>
            <BaseAspectCard key={camp.id}>
              <Box
                sx={{
                  padding: 3,
                }}
              >
                <Typography variant="h6">{camp.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  даты: {formatDate(camp.startDate)} -{" "}
                  {formatDate(camp.startDate)}
                </Typography>
                <Typography variant="body2">город: {camp.city}</Typography>
              </Box>
            </BaseAspectCard>
          </Link>
        ))}
      </Grid>
    </div>
  );
}
