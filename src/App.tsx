// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import LoginPage from "./components/features/auth/LoginPage";
import RegisterPage from "./components/features/auth/RegisterPage";
import CategoryPage from "./components/features/category/CategoryPage";
import CategoryCreatePage from "./components/features/category/CategoryCreatePage";
import CategoryUpdatePage from "./components/features/category/CategoryUpdatePage";

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/category/create" element={<CategoryCreatePage />} />
              <Route
                path="/category/edit/:id"
                element={<CategoryUpdatePage />}
              />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
