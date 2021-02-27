import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import AddToCart from './AddToCart.jsx';


// this component functions as described in the business doc but the visuals absolutely suck for now

function StyleSelector(props) {

  const { selectedProduct, selectedStyle, selectStyle, updatePrice, updateSale } = props;

  const [styles, updateStyles] = useState([]);

  const getStyles = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, header)
      .then((res) => {
        updateStyles(res.data.results);

        // By default, the style selected will be the first in the list
        let def = res.data.results[0];
        handleSelect(def.style_id, def.original_price, def.sale_price);
      })
      .catch((err) => {
        console.error(err)
      })
  };

  const handleSelect = (styleID, price, sale) => {
    selectStyle(styleID);
    updatePrice(price);
    updateSale(sale);
  }

  useEffect(() => {
    if (selectedProduct !== null) {
      getStyles(selectedProduct.id)
    }
  }, [selectedProduct])

  // buttons do render from their thumbnail_image props but css still needs a lot of work
  const makeButtonCSS = (thumbnail) => {
    return {
      border: '1px solid black',
      width: 50,
      height: 50,
      margin: 1,
      borderRadius: '50%',
      backgroundImage: `url(${thumbnail})`,
      backgroundSize: 'contain',
    }
  }


  const getNameOfSelectedStyle = () => {
    for (let option of styles) {
      if (option.style_id === selectedStyle) {
        return option.name
      }
    }
  }

  return (
    <div>
      {styles.length ?
        <div>
          <span>{getNameOfSelectedStyle()}</span>
          <div className='style-options-container'
          // first time using 'grid', 'template columns' and 'auto rows' - will come back to this
          style={{ width: 200, display: 'grid',  gridTemplateColumns: '1fr 1fr 1fr 1fr', gridAutoRows: 75 }}>
            {styles.map((option, index) => {
              return <div key={index}>
                <div style={{height: 20, width: 50}}>
                  {selectedStyle === option.style_id ?
                    <span>✔</span>
                    : null}
                </div>
                <button key={index}
                  className='style-option-button'
                  style={makeButtonCSS(option.photos[0].thumbnail_url)}
                  onClick={() => handleSelect(option.style_id, option.original_price, option.sale_price)}>
                </button>
              </div>
            })}
          </div>
          <AddToCart selectedProduct={selectedProduct} selectedStyle={selectedStyle} styles={styles} />
        </div>
        : null
      }
    </div >
  )
}

export default StyleSelector;