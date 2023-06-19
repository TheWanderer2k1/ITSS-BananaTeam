import React from 'react';

function FoodReview(props) {
  return (
    <div>
      <h3>Đánh giá của món ăn</h3>
      <ul>
        {props.foodReviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoodReview;