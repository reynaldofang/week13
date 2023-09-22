import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        values
      );

      console.log("Login successful:", response.data);

      navigate("/category");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="email"
            as={TextField}
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            error={false}
          />
          <ErrorMessage name="email">
            {(message) => <div className="error-message">{message}</div>}
          </ErrorMessage>
          <Field
            name="password"
            as={TextField}
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            error={false}
          />
          <ErrorMessage name="password">
            {(message) => <div className="error-message">{message}</div>}
          </ErrorMessage>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
        Belum ada akun?{" "}
        <MuiLink component={Link} to="/register" color="primary">
          Register disini
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default LoginPage;
