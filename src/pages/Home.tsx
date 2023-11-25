import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import pokeball  from "../assets/pokeball.png";

function createData(
  type: string,
  descryption: string,
  value: number,
) {
  return { type, descryption, value };
}

const rows = [
  createData('Entrada', 'Isso é uma descrição completa', 6.0),
  createData('Saida', 'Isso é uma descrição completa', 9.0),
  createData('Saida', 'Isso é uma descrição completa', 16.0),
  createData('Saida', 'Isso é uma descrição completa', 3.7),
  createData('Entrada', 'Isso é uma descrição completa', 16.0),
];

function Home() {
  return (
    <>
      <Box sx={{bgcolor: red[500], height:"200", padding:2, display: 'flex'}}>
        <Typography variant="h4" component="div" sx={{alignSelf: 'center', color: 'yellow', textShadow: '4px 4px 4px rgba(57, 149, 255, 0.808)'}} gutterBottom>
        <img src={pokeball} alt="my icon" style={{width: '24px', height: '24px'}} /> Listagem de Pokémons
        </Typography>
      </Box>

      <Box>
        <Paper elevation={3} sx={{padding:2, display:"flex", justifyContent: 'space-between'}}>
          <Box>
          <Typography variant="h5" component="div" gutterBottom>
            Bem vindo ao sistema de gerenciamento de pagamentos.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Este sistema foi desenvolvido para facilitar o gerenciamento de
            pagamentos de uma empresa.
          </Typography>
          </Box>
          <Box sx={{alignSelf:'center', marginRight:3}}>
          </Box>
        </Paper>
      </Box>

      <Box sx={{padding: 5, display:'flex', justifyContent:'center'}}>
      <TableContainer sx={{maxWidth: '70%'}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.descryption}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>


    </>
  );
}

export default Home;
