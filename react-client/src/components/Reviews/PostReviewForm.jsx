import React, { useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js'
import Modal from 'react-modal';

const PostReviewForm = (props) => {
  const [postModalIsOpen, setPostModalIsOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  let reviewPost = {
    product_id: props.review_id,
    rating: rating,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: photos,
    characteristics: {},
  };

  const setCharacteristic = (key, value) => {
    console.log(key, value);
    reviewPost.characteristics[key] = value;
  };

  const submitReview = (e) => {
    e.preventDefault();
    console.log(reviewPost);
    setPostModalIsOpen(!postModalIsOpen);
    // axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax//reviews/${props.id}/report`, reviewPost, header)
    //   .then(() => {
    //     console.log('submitted a new review');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const options = ["1 star - “Poor”", "2 stars - “Fair”", "3 stars - “Average”", "4 stars - “Good”", "5 stars - “Great”"];
  const size = ["Size", "1 - A size too small", "2 - ½ a size too small", "3 - Perfect", "4 - ½ a size too big", "5 - A size too wide"];
  const width = ['Width', '1 - Too narrow', '2 - Slightly narrow', '3 - Perfect', '4 - Slightly wide', '5 - Too wide'];
  const comfort = ['Comfort', '1 - Uncomfortable', '2 - Slightly uncomfortable', '3 - Ok', '4 - Comfortable', '5 - Perfect'];
  const quality = ['Quality', '1 - Poor', '2 - Below average', '3 - What I expected', '4 - Pretty great', '5 - Perfect'];
  const length = ['Length', '1 - Runs Short', '2 - Runs slightly short', '3 - Perfect', '4 - Runs slightly long', '5 - Runs long'];
  const fit = ['Fit', '1 - Runs tight', '2 - Runs slightly tight', '3 - Perfect', '4 - Runs slightly long', '5 - Runs long'];

  return (
    <Modal isOpen={postModalIsOpen} >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <form className="addReviewForm" onSubmit={submitReview}>
          <div className="review-form-component">
            <label>
              Overall rating
              <select style={{margin: '1%'}} onChange={(e) => setRating(e.target.value)}>
                {options.map((option, i) => (
                  <option value={i + 1} key={i}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Do you recommend this product?
              <select style={{margin: '1%'}} onChange={(e) => setRecommend(e.target.value)}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
          <div className="review-form-component" style={{display: 'flex', flexDirection: 'row'}}>
          <label>
            Characteristics:
            <select style={{margin: '1%'}} name="size" onChange={(e) => setCharacteristic(e.target.name, e.target.value)}>
              {size.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="width">
              {width.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="comfort">
              {comfort.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="quality">
              {quality.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="length">
              {length.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
            <select style={{margin: '1%'}} onChange={(e) => setCharacteristic(e.target.name, e.target.value)} name="select">
              {fit.map((ele, i) => (
                <option key={i} value={i} >{ele}</option>
              ))}
            </select>
          </label>
          </div>
          <div className="review-form-component">
            <label>
              Review summary:
              <input style={{margin: '1%'}} placeholder="Example: Best purchase ever!" onChange={(e) => setSummary(e.target.value)} type="text" name="" />
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Review body:
              <input style={{margin: '1%'}} placeholder="Why did you like the product or not?"  onChange={(e) => setBody(e.target.value)} type="text" name="" />
            </label>
          </div>
          <div className="review-form-component">
            <label>
              Upload your photos:
              <button>Upload photos</button>
            </label>
          </div>
         <div className="review-form-component">
          <label>
              What is your nickname?:
              <input style={{margin: '1%'}} placeholder="Example: jackson11!" onChange={(e) => setName} type="text" name="" />
              For privacy reasons, do not use your full name or email address” will appear.
            </label>
         </div>
        <div id="text-under-form" className="review-form-component">
            <label>
              Your email:
              <input style={{margin: '1%'}} placeholder="Example: jackson11@email.com"  onChange={(e) => setEmail(e.target.value)} type="text" name="" />
              For authentication reasons, you will not be emailed” will appear.
            </label>
        </div>
          <input
            type="submit"
            name="submit"/>
        </form>
      </div>
    </Modal>

  );
};

export default PostReviewForm;
