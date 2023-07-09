import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { sendRequest } from '../../../helpers/requestHelper';
import FoodInfo from './food-info';
import FoodReview from './food-review';
import "./food-screen.css"
import NavbarInteractive from '../../homepage/components/navbar-interactive';

function FoodScreen(props) {
  let { id } = useParams();
  const [foodDescription, setFoodDescription] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await sendRequest({
          url: `${process.env.REACT_APP_SERVER}/api/v1/foods/${id}`,
          method: "GET",
        });
        setFoodDescription(resp.data['content']);
        console.log("data:", resp.data['content']);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='hcontainer'>
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>

     <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex'}} className="container row">
        <div className="left-column col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {foodDescription && (
            <FoodInfo
              image={foodDescription.img ? foodDescription.img : ''}
              name={foodDescription.name}
              price={foodDescription.price}
              description={foodDescription.description}
              score={foodDescription.rating}
              restaurantImg={foodDescription.restaurant ? foodDescription.restaurant.avatarImg : ''}
              restaurantId={foodDescription.restaurant ? foodDescription.restaurant.id : ''}
            />
          )}
        </div>
        <div className="right-column col-xs-12 col-sm-12 col-md-6 col-lg-5">
          <FoodReview id={id}/>
        </div>
      </div>
    </div>
  );
}

export default FoodScreen;
