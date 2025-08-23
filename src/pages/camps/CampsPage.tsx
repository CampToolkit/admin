import { useModal } from "@/app/providers/contexts/global-modal/use-modal.hook.ts";

import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import BaseTile from "@/shared/components/tile/BaseTile";
import PageTitle from "@/shared/components/PageTitle";

export default function CampsPage() {
  const { openModal } = useModal();

  return (
    <div style={{ padding: "20px" }}>
      <Button
        onClick={() => {
          openModal({ content: <div>TEST</div> });
        }}
      >
        open
      </Button>
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
        <Link to="/camps/1" style={{ textDecoration: "none" }}>
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
        </Link>
      </Box>
    </div>
  );
}
