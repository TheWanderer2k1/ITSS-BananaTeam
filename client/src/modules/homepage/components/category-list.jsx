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
        url: `${ process.env.REACT_APP_SERVER }/api/v1/home`,
        method: "GET",
      })
    console.log('in home', resp.data['content']['categories'])
    setCategories(resp.data['content']['categories'])
  };
  


  return (
    <div className="home-container1">
      {categories.slice(0, 7).map((category) => (
        <CategoryItem
          key={category.categoryId}
          image_src={category.img}
          categoryId={category.categoryId}
          text={category.name}
        />
      ))}
    </div>
  );
}

export default ListComponent;