import React, { useEffect, useState } from "react";
import CategoryItem from "./category-item";

function ListComponent() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("https://mocki.io/v1/7765e32a-6765-486e-af9a-56220ac6f88a")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryItem
          key={category.categoryId}
          img={category.img}
          categoryId={category.categoryId}
        />
      ))}
    </div>
  );
}

export default ListComponent;