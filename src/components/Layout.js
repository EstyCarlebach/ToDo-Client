import React from "react";
import AppHeader from "./AppHeader";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Copyright() {
    // return (
    //   // <Typography variant="body2" color="text.secondary" align="center">
    //   //   {"Copyright © "}
    //   //     Auth Sample
    //   //   {new Date().getFullYear()}
    //   //   {"."}
    //   // </Typography>
    // );
  }

const theme = createTheme();

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <AppHeader></AppHeader>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
      <ThemeProvider  theme={theme}>
        <CssBaseline />
        <main>{children}</main>
        <Box component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        </Typography>
        <Copyright />
      </Box>
      </ThemeProvider>
      </div>
    </>
  );
};

export default Layout;
