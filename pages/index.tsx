"use-client";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";

import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { signIn } from "next-auth/react";
import * as yup from "yup";
// import fondoLoginCMF from "/assets/images/cmf_linea/fondoLoginCMF.webp";
// import logoCMF from "/assets/images/cmf_linea/logoCMF.svg";
// import mockup from "/assets/images/cmf_linea/mockup.webp";

// Validación del formulario con Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Introduzca un correo electrónico válido")
    .required("Campo requerido"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Campo requerido"),
});

// Estilos personalizados para el TextField
const RedditTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputAdornment-root": {
    marginTop: "0!important",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root": {
    left: "30px",
  },
  "& .MuiInputBase-input-MuiFilledInput-input": {
    paddingLeft: "3px !important",
  },

  "& .MuiInputLabel-root": {
    position: "absolute",
    left: "30px",
    marginLeft: "14px",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px",
  },
  "& .MuiFilledInput-root": {
    borderRadius: "16px",
    border: "1px solid var(--specific-light-stroke-l, #D0D5DD)",
    background: "var(--specific-light-background-white, #FFF)",
    overflow: "hidden",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Componente Login
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  // const { Authenticated, emailUser, ResetLoading } = useSelector(
  //   (state) => state.AuthenticationReducer
  // );
  // const dispatch = useDispatch();
  const navigate = useRouter();
  const router = useRouter();
  // Función para manejar el cambio de visibilidad de la contraseña
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  // Manejo del cierre del dialogo para resetear la contraseña

  // Función de éxito para navegar al formulario de reset de contraseña
  const onSuccess = (success: boolean) => {
    if (success) {
      navigate.push("/reset-password");
    }
  };

  // Formulario con Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Realiza una solicitud POST al API de login
        const res = await signIn("credentials", {
          redirect: false,
          username: values.email,
          password: values.password,
        });
        // fetch("/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json", // Asegúrate de enviar los datos en formato JSON
        //   },
        //   body: JSON.stringify({
        //     email: values.email,
        //     password: values.password,
        //   }),
        // });

        // const data = await response.json();

        if (res?.error) {
          // setError("Invalid credentials");
        } else {
          // Redirige a la página de inicio después de un login exitoso
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgb(242, 244, 247)",
        }}
      >
        <img
          src="/assets/images/cmf_linea/logoCMF.svg"
          alt="Logo"
          style={{ marginBottom: "20px" }}
        />
        <form
          onSubmit={formik.handleSubmit}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: "16px" }}
          >
            Iniciar sesión
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            ¡Bienvenido! Por favor, ingresa tus datos
          </Typography>

          <RedditTextField
            fullWidth
            label="Correo electrónico"
            variant="filled"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon
                    fontSize="small"
                    sx={{
                      color: "var(--specific-light-semantic-brand-secondary)",
                      margin: "0px 8px",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "16px" }}
          />

          <RedditTextField
            fullWidth
            label="Contraseña"
            variant="filled"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon
                    fontSize="small"
                    sx={{
                      color: "var(--specific-light-semantic-brand-secondary)",
                      margin: "0px 8px",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility sx={{ color: "#026E18" }} />
                    ) : (
                      <VisibilityOff sx={{ color: "#026E18" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "16px" }}
          />

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href="#"
              onClick={() => navigate.push("/reset-password")}
              style={{
                color: "var(--specific-light-semantic-brand-secondary)",
              }}
            >
              Crear / Cambiar mi contraseña
            </a>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <LoadingButton
              loading={false} // Aquí pondrías el estado de carga real
              variant="contained"
              type="submit"
              fullWidth
            >
              Iniciar sesión
            </LoadingButton>
          </div>
        </form>
      </div>

      {/* Imagen de fondo y mockup */}
      <div style={{ flex: 1 }}>
        <img
          src="/assets/images/cmf_linea/fondoLoginCMF.webp"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "right bottom",
          }}
          alt="Background"
        />
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img
            // src="/assets/images/cmf_linea/mockup.webp"
            style={{ width: "80%" }}
            alt="Mockup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
