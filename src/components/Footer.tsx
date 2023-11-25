import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

function Footer() {
  return (
    <>
      <Box sx={{bgcolor: red[500], height:"200", padding:2, display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h6" component="div" sx={{color: "white"}}>
         Todos os direitos reservados - Mateus Silva 2023 ©️
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
