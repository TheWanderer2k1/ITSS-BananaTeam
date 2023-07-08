import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { sendRequest } from '../../../helpers/requestHelper';
import FoodInfo from './food-info';
import FoodReview from './food-review';
import "./food-screen.css"
// import "../../homepage/components/navbar-interactive"
import NavbarInteractive from '../../homepage/components/navbar-interactive';

function FoodScreen(props) {
  let { id } = useParams();
  const [foodDecription, setFoodDescription] = useState({});
  const [foodReviews, setFoodReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Tạo biến isLoading và khởi tạo là true


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Bắt đầu fetch data
        const resp = await sendRequest({
          url: `${ process.env.REACT_APP_SERVER }/api/v1/foods/${id}`,
          method: "GET",
        });
        setFoodDescription(resp.data['content']);
        setCurrentImageIndex(0);
        console.log("Day la data: " ,foodDecription);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Kết thúc fetch data
      }
    };

    fetchData();
  }, [id]); // Sửa lại dependency của useEffect

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='hcontainer'>
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>

     <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex'}} className="container row">
        <div className="left-column col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {foodDecription && (
            <FoodInfo
              image={foodDecription.img ? foodDecription.img: ''}
              name={foodDecription.name}
              price={foodDecription.price}
              description={foodDecription.description}
              score={foodDecription.rating}
              restaurantImg = {foodDecription.restaurant.avatarImg ? foodDecription.restaurant.avatarImg : ''}
              restaurantId = {foodDecription.restaurant.id}
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