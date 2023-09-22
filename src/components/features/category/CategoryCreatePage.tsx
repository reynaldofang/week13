// CategoryCreatePage.tsx
import React, { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const CategoryCreatePage: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwNTNhM2E3LTMzNzAtNDYyZS04M2I5LWE5ODc3Yjg4MGZjOSIsImlhdCI6MTY5NTM5NjYwNSwiZXhwIjoxNjk1NDE4MjA1fQ.JKwsLm28Y7Y6KDDp4ue4NLoV_edtAvqgw9unfZyeIUU";


  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/category/create",
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );

  
      navigate("/category");

      console.log("Category created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Category
      </Typography>
      <TextField
        label="Category Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        style={{ marginTop: "16px" }}
      >
        Create
      </Button>
    </Container>
  );
};

export default CategoryCreatePage;
