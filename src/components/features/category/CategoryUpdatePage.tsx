import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwNTNhM2E3LTMzNzAtNDYyZS04M2I5LWE5ODc3Yjg4MGZjOSIsImlhdCI6MTY5NTM5NjYwNSwiZXhwIjoxNjk1NDE4MjA1fQ.JKwsLm28Y7Y6KDDp4ue4NLoV_edtAvqgw9unfZyeIUU";

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const response = await axios.get(
          `https://mock-api.arikmpt.com/api/category/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCategory(response.data);
        setIsActive(response.data.is_active);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      }
    };

    fetchCategoryById();
  }, [id, token]);

  if (!category || isActive === null) {
    // Menampilkan pesan loading atau komponen loading spinner jika data belum tersedia
    return <div>Loading...</div>;
  }

  const handleIsActiveChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsActive(event.target.value === "true");
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" value={category.id} readOnly />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={category.name} />
        </div>
        <div>
          <label>Is Active:</label>
          <select
            value={isActive ? "true" : "false"}
            onChange={handleIsActiveChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCategory;
