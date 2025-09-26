import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import SidebarMenu from "@/common/components/SidebarMenu.tsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MainLayout() {
  return (
    <>
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

      <Container maxWidth={"xl"} sx={{ mt: 10, px: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
