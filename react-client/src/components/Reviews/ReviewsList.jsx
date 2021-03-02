import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewsList = (props) => {
  if (!props.reviews) {
    return <div></div>
  }
  return (
    <div>
      { props.reviews.slice(0, props.amountOfReviews).map((review, index) => {
        return <ReviewTile avgRating={props.avgRating} getReviews={props.getReviews} review={review} key={index} />
      }) }
    </div>
  )
}

export default ReviewsList;
