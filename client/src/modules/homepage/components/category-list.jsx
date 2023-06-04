import React, { useEffect, useState } from "react";
import CategoryItem from "./category-item";
import { sendRequest } from '../../../helpers/requestHelper';

function ListComponent() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const resp = await sendRequest({
        url: `http://localhost:8000/api/v1/home`,
        method: "GET",
      })
    console.log('in home', resp.data['content']['categories'])
    setCategories(resp.data['content']['categories'])
  };
  
  return (
    <div className="home-container1">
      {categories.map((category) => (
        <CategoryItem
          key={category.categoryId}
          image_src={category.img}
          categoryId={category.categoryId}
        />
      ))}
    </div>
  );
}

export default ListComponent;