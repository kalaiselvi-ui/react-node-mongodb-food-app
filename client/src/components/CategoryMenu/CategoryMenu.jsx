import React from 'react';
import { menu_list } from '../../assets/frontend_assets/assets';
import './CategoryMenu.scss';

const CategoryMenu = ({ category, setCategory }) => {

    return (
        <div className='category-menu' id='category'>
            <h1>Explore Our Menu</h1>
            <p>choose from a diverse menu featuring a deletable array of dishes crafted with the finest ingredients and culinary expertise.</p>
            <div className='explore-menu-list'>
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} key={index} className='explore-menu-list-item'>
                                <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }

            </div>
            <hr />

        </div>
    )
}

export default CategoryMenu