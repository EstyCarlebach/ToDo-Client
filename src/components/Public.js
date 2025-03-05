import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import service1 from "../service1";

export default function Public() {
  const [information,setInformation] =React.useState("")
  //קריאת שרת של מידע על האפליקציה
   React.useEffect(()=>{
          service1.info().then(a=>{
            console.log(a);
              setInformation(a.data);
          })
      }, [])
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
         style={{color:'#194350',marginTop:'2rem  '}} 
        >
          דף ציבורי
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          את המידע בדף הזה יכולים לראות כל המבקרים באתר.
          <br />
          אין צורך להתחבר כדי לצפות בדף זה.
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          מידע על האפליקציה
        </Typography>
        <p>{information}</p>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <br>
          </br>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button style={{backgroundColor:'#194350',color:'white'}} variant="outlined">התחברות</Button>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <Button style={{backgroundColor:'#194350',color:'white'}} variant="contained">הרשמה</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
    </div>
  );
}
