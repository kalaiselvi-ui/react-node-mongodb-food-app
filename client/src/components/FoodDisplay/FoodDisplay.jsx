import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodCard from './FoodCard';
import './FoodCard.scss';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    console.log(food_list, 'foodlist');
    console.log("Selected Category:", category);

    // Filter food_list before mapping
    const filteredFoodList = food_list.filter(item => category === 'All' || item.category === category);

    console.log("Filtered Food List:", filteredFoodList); // Debugging

    return (
        <div className='food-card'>
            <h2>Top dishes near you</h2>
            <div className="food-card-list">
                {filteredFoodList.length > 0 ? (
                    filteredFoodList.map((item) => (
                        <FoodCard item={item} key={item._id} id={item._id} />
                    ))
                ) : (
                    <p>No items available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;
