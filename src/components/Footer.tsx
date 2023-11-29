import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

function Footer() {
  return (
    <Box sx={{ marginTop: '10px', bgcolor: red[500], padding: 2 }}>
      <Typography variant="h6" component="div" sx={{ color: "white", textAlign: 'center' }}>
        Todos os direitos reservados - Mateus Silva 2023 ©️
      </Typography>
    </Box>
  );
}

export default Footer;