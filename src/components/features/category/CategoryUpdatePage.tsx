// App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

// Define the interface for Category
interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

// Component to display the category data
const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{category.name}</Typography>
      <Typography variant="body2">ID: {category.id}</Typography>
      <Typography variant="body2">
        Is Active: {category.is_active ? "Yes" : "No"}
      </Typography>
    </CardContent>
  </Card>
);

const App: React.FC = () => {
  // State to hold the category data and error message
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch the category data when component mounts
  useEffect(() => {
    const fetchCategoryById = async (id: string) => {
      try {
        const response = await axios.get<Category>(
          `https://mock-api.arikmpt.com/api/category/${id}`
        );
        setCategory(response.data);
      } catch (error) {
        setError(
          error.response
            ? `Error: ${error.response.status}`
            : "An error occurred"
        );
      }
    };

    fetchCategoryById("614ef2d1870a1639b46f8e1a"); // replace with your desired ID
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {category && <CategoryCard category={category} />}
    </div>
  );
};

export default App;
