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

export default function Register() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("email@gmail.com");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();
//קריאת שרת של הרשמה
  const handleSubmit = async (event) => {
    event.preventDefault();
    var f = await service1.addUser(user.id, user.name, user.password);
    console.log("f", f);
    // //אמור לחזור 401
    // if (f.data == null)
    //   navigate("/login", { replace: true });
    // else
      navigate("/todo", { replace: true });
  };

  return (
    <Container>

    <Box
    sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
    >
      <Avatar sx={{ m:0.5, bgcolor: "secondary.main" ,backgroundColor:'#194350'}}>
        <LockOutlinedIcon style={{backgroundColor:'#194350'}}/>
      </Avatar>
      <Typography component="h1" variant="h5">
        הרשמה
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate >

        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="שם"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
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
          sx={{backgroundColor:'#4D4D4D' , mt: 1, mb:1 }}
        >
          הרשמה
        </Button>
        <Grid container>
          <Grid item>
          <Link href="/" variant="body2" style={{color:'#194350'}}>
          {"יש לך כבר חשבון? להתחברות"}
          </Link>
           
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Container>
  );
}
