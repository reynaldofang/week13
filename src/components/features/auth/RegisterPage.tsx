import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const RegistrationPage: React.FC = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/register",
        values
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="name"
            as={TextField}
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            error={false}
          />
          <ErrorMessage name="name">
            {(message) => <div className="error-message">{message}</div>}
          </ErrorMessage>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Form>
      </Formik>
      {/* Tambahkan teks dan tautan untuk login */}
      <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
        Sudah pernah register?{" "}
        <MuiLink component={Link} to="/" color="primary">
          Login disini
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default RegistrationPage;
