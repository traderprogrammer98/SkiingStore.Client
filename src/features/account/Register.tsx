import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleApiErrors = (errors: string[]) => {
    errors.forEach((error) => {
      if (error.includes("Password")) {
        setError("password", { message: error });
      } else if (error.includes("Email")) {
        setError("email", { message: error });
      } else if (error.includes("Username")) {
        setError("username", { message: error });
      }
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(async (data) => {
            agent.Account.register(data)
              .then(() => {
                navigate("/login");
                toast.success("Successfully registered. please log in.");
              })
              .catch((errors) => handleApiErrors(errors));
          })}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
            {...register("username", { required: "Username is required." })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoFocus
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^.+@[^\.].*\.[a-z]{2,}$/,
                message: "Enter a valid email address.",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required.",
            })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
            disabled={!isValid}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to={"/login"}>{"Already have an account? Log in"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
