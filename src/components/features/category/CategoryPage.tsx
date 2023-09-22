import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const MyTable: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwNTNhM2E3LTMzNzAtNDYyZS04M2I5LWE5ODc3Yjg4MGZjOSIsImlhdCI6MTY5NTM5NjYwNSwiZXhwIjoxNjk1NDE4MjA1fQ.JKwsLm28Y7Y6KDDp4ue4NLoV_edtAvqgw9unfZyeIUU";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mock-api.arikmpt.com/api/category",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = (id: string) => {
    console.log("Edit category with ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete category with ID:", id);
  };

  const handleAddNewCategory = () => {
    navigate("/category/create");
    console.log("Adding a new category...");
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Category List
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleAddNewCategory}>
        Add New Category
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Category table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyTable;
