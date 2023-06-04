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
        url: `https://mocki.io/v1/e56cca61-2e6a-4274-8ac2-ac8597e0bbdb`,
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
          img={category.img}
          categoryId={category.categoryId}
        />
      ))}
    </div>
  );
}

export default ListComponent;