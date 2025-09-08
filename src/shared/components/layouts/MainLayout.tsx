import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import SidebarMenu from "@/shared/components/SidebarMenu.tsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MainLayout() {
  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: "100vh",
        pt: 10,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton>
            <Link to={"/profile"}>
              <AccountCircleIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CampToolkit Панель администратора
          </Typography>
          <SidebarMenu />
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={"xl"}
        sx={{
          px: 2,
          height: "100%",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
