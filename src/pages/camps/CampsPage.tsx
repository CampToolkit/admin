
import {
  MenuItem,
  Box,
  Select,
  Typography,
  type SelectChangeEvent,
  Button,
} from "@mui/material";

import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Link } from "react-router-dom";


import { Box, Button, Typography } from "@mui/material";
import BaseTile from "@/shared/components/tile/BaseTile";
import PageTitle from "@/shared/components/PageTitle";
import { useState } from "react";

const CAMP_FILTER_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "current", label: "Текущие" },
  { value: "finished", label: "Завершенные" },
] as const;

type CampFilterValue = (typeof CAMP_FILTER_OPTIONS)[number]["value"];

export default function CampsPage() {

  const [campsFilterStatus, setCampsFilterStatus] =
    useState<CampFilterValue>("all");

  const handleFilterCamps = (event: SelectChangeEvent<CampFilterValue>) => {
    setCampsFilterStatus(event.target.value as CampFilterValue);
  };

  const onClickCreateCamp = async () => {
    console.log("onClickCreateCamp");
  };

  return (
    <div style={{ padding: "20px" }}>
      
            <Button
        onClick={() => {
          openModal({ content: <div>TEST</div> });
        }}
      >
        open
      </Button>
      
      
      <Box sx={{ mb: 5 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: 16 }}
          onClick={onClickCreateCamp}
        >
          Новый сбор
        </Button>
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


  const { openModal } = useModal();

  return (
    <div style={{ padding: "20px" }}>

      <PageTitle title="Сборы" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          "@media (min-width: 992px)": {
            justifyContent: "flex-start",
          },
        }}
      >
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
      </Box>
    </div>
  );
}
