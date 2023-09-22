import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextField, Button, Box, Checkbox } from "@mui/material";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const token: string =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwNTNhM2E3LTMzNzAtNDYyZS04M2I5LWE5ODc3Yjg4MGZjOSIsImlhdCI6MTY5NTM5NjYwNSwiZXhwIjoxNjk1NDE4MjA1fQ.JKwsLm28Y7Y6KDDp4ue4NLoV_edtAvqgw9unfZyeIUU";

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const response = await axios.get<Category>(
          `https://mock-api.arikmpt.com/api/category/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const categoryData: Category = response.data;
        setCategory(categoryData);
        setName(categoryData.name);
        setIsActive(categoryData.is_active);

        console.log("Received category data:", categoryData);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      }
    };

    fetchCategoryById();
  }, [id, token]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIsActiveChange = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const updatedCategory: Category = {
      id: category!.id,
      name: name,
      is_active: isActive,
    };

    try {
      await axios.put(
        `https://mock-api.arikmpt.com/api/category/update`,
        updatedCategory,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (category === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" value={category.id} />
        </div>
        <div>
          <label>Name:</label>
          <TextField
            variant="outlined"
            value={name || ""}
            onChange={handleNameChange}
            fullWidth
            defaultValue={category.name}
          />
        </div>
        <div>
          <label>Is Active:</label>
          <Checkbox checked={isActive} onChange={handleIsActiveChange} />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default EditCategory;
