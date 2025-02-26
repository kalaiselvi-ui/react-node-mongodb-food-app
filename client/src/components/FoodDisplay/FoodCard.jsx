import React, { memo, useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './FoodCard.scss';

const FoodCard = memo(({ item, id }) => {

    const { cartItems, removeFromCart, addToCart } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={item.image} alt="" />
                {
                    !cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' /> : (
                        <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                    )
                }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{item.description}</p>
                <p className='food-item-price'>${item.price}</p>
            </div>
        </div>
    );
});

FoodCard.displayName = "FoodCard";

export default FoodCard;
