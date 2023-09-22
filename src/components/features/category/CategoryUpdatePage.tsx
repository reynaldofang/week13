import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CategoryUpdatePage: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwNTNhM2E3LTMzNzAtNDYyZS04M2I5LWE5ODc3Yjg4MGZjOSIsImlhdCI6MTY5NTM5NjYwNSwiZXhwIjoxNjk1NDE4MjA1fQ.JKwsLm28Y7Y6KDDp4ue4NLoV_edtAvqgw9unfZyeIUU";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://mock-api.arikmpt.com/api/category/${categoryId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchCategory();
  }, [categoryId, token]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://mock-api.arikmpt.com/api/category/update/${categoryId}`,
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/category");

      console.log("Category updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Update Category
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
        onClick={handleUpdate}
        style={{ marginTop: "16px" }}
      >
        Update
      </Button>
    </Container>
  );
};

export default CategoryUpdatePage;
