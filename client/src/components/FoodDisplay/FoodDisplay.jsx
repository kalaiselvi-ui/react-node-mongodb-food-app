import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodCard from './FoodCard'
import './FoodCard.scss'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)
    console.log(food_list, 'foodlist')

    return (
        <div className='food-card'>
            <h2>Top dishes near you</h2>
            <div className="food-card-list">
                {
                    food_list.map((item, index) => {
                        if (category === 'All' || category === item.category) {
                            return (
                                <FoodCard item={item} key={index} id={item._id} />
                            )
                        }
                    })
                }
            </div>

        </div>
    )
}

export default FoodDisplay