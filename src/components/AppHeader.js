import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'
import service1 from "../service1";
import '../Style/s.css'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
  { title: <Diversity3Icon style={{fontSize:"2.5rem"}}></Diversity3Icon>, route: "/public" },
  { title: <AssignmentIcon style={{fontSize:"2.5rem"}}></AssignmentIcon>, route: "/todo" },
];

function AppHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const location = useLocation()

  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    console.log('render app header', loginUser)
    // setLoginUser(    service1.getUser()
  // )
    setLoginUser(service1.getLoginUser());
  }, [location.key]);

  return (
    <AppBar sx={{marginBottom:'7rem',height:'4rem', backgroundColor:'#4D4D4D'}}>
      <Container>
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
             
            >
              {pages.map((page) => (
                <MenuItem  key={page.title} onClick={handleCloseNavMenu}>
                  <Link style={{padding:'0'}} class="a" href={page.route}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link style={{ textDecoration: "none" }} href={page.route}>
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          {loginUser ? (
            <div>
              {loginUser.name} מחובר | 
              <Button color="inherit" onClick={()=>{
                service1.logout();
                navigate('/')
              }}><LogoutIcon fontSize="large"></LogoutIcon></Button>
            </div>
          ) : (
            <div>
            <Button color="inherit" onClick={()=>{
                navigate('/')
              }}><PersonAddAlt1Icon fontSize="large"></PersonAddAlt1Icon></Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
