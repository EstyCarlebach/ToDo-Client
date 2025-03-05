import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import service1 from "../service1";

export default function Login() {
  //המשתמש
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  //שמירת המשתמש
  const handleSubmit = async (event) => {
    event.preventDefault();
    //של התחברות API  קריאת     
    var f=await service1.login(user.id,user.name,user.password);
    // //אמור להחזיר שגיאת 401 ובמקרה זה יש לשלוח להרשמה
    // if(f.data==null)
    //   navigate("/register", { replace: true });
    // else
    navigate("/todo", { replace: true });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" ,backgroundColor:'#194350'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="מספר זהות"
            name="id"
            autoComplete="id"
            autoFocus
            onChange={(e) => setUser({ ...user, id: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
         
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{backgroundColor:'#4D4D4D' ,mt: 3, mb: 2 }}
          >
            התחברות
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2" style={{color:'#194350'}}>
                {"אין לך עדין חשבון? להרשמה"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
