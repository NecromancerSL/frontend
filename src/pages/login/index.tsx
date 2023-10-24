import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/userActions";
import { adminLogin } from "../../store/actions/adminActions";

type Props = {
  userLogin: (email: string, password: string) => void;
  adminLogin: (email: string, password: string) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
function Login({ userLogin, adminLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAdmin) {
      try{
        adminLogin(email, password);
        console.log("Login Funcionou");
        navigate("/dashboardadmin");
      }catch(error){
        console.log("Login não funcionou");
      }
    } else {
      try{
        userLogin(email, password);
        console.log("Login Funcionou");
        navigate("/dashboarduser");
      }catch(error){
        console.log("Login não funcionou");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                color="primary"
                onChange={() => setIsAdmin(!isAdmin)}
              />
            }
            label="Sou administrador"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/cadastrousuario">Não tem uma conta? Cadastre-se</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const styles = {
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(null, { userLogin, adminLogin })(Login);
