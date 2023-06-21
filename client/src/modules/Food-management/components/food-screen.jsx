import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FoodInfo from './food-info';
import FoodReview from './food-review';
import "./food-screen.css"
// import "../../homepage/components/navbar-interactive"
import NavbarInteractive from '../../homepage/components/navbar-interactive';

function FoodScreen(props) {
  let { id } = useParams();
  const [foodDecription, setFoodDescription] = useState({});
  const [foodReviews, setFoodReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < foodDecription.img.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleDelete = () => {
    // Xử lý sự kiện nhấn nút Delete
  };

  const handleEdit = () => {
    // Xử lý sự kiện nhấn nút Edit
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8000/api/v1/foods/159`);
      setFoodDescription(result.data);
      setCurrentImageIndex(0);
      console.log("Day la data: " ,result.data )
    };

    fetchData();
  }, [props.id]);

  return (
    <div className='hcontainer'>
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>

     <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex'}} className="container row">
        <div className="left-column col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {foodDecription && (
            <FoodInfo
              image={foodDecription.img ? foodDecription.img[currentImageIndex]: ''}
              name={foodDecription.name}
              description={foodDecription.description}
              score={foodDecription.rating}
              onClickPrev={handlePrev}
              onClickNext={handleNext}
              onClickDelete={handleDelete}
              onClickEdit={handleEdit}
            />
          )}
        </div>
        <div className="right-column col-xs-12 col-sm-12 col-md-6 col-lg-5">
          {foodReviews && <FoodReview 
          id={id}/>}
        </div>
      </div>
    </div>
  );
}

export default FoodScreen;