import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import type { SxProps, Theme } from "@mui/system";

type PageTitleType = {
  title: string;
  showBackButton?: boolean;
  sx?: SxProps<Theme>;
};

export default function PageTitle(props: PageTitleType) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
      {props.showBackButton && (
        <IconButton
          onClick={handleGoBack}
          sx={{
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
            },
            ...props.sx,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
        {props.title}
      </Typography>
    </Box>
  );
}
