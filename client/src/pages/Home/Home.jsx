import React, { useState } from 'react'
import AppDownload from '../../components/AppDownload/AppDownload'
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Hero from '../../components/Hero/Hero'
import './Home.scss'

const Home = () => {
    const [category, setCategory] = useState('All');

    return (
        <div>
            <Hero />
            <CategoryMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload />

        </div>
    )
}

export default Home