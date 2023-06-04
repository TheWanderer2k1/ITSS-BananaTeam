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
        url: `https://mocki.io/v1/72763f80-9ce7-4523-9957-ff0192e559ed`,
        method: "GET",
      })
    console.log('in home', resp.data['data']['categories'])
    setCategories(resp.data['data']['categories'])
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