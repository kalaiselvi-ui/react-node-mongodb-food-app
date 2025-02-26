import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.scss';

const List = ({ url }) => {
    const [list, setList] = useState([])

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response, 'res')
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    const removeFood = async (foodId) => {
        console.log(foodId);

        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();

        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }

    }
    return (
        <div className='list add'>
            <p className='main-title'>All Foods</p>
            <div className='list-table-format title'>
                <b>id</b>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((data, index) => (
                <div key={index} className='list-table-format'>
                    <p className='smallsize-id'>{index + 1}</p>
                    <img src={data.image} alt="" />
                    <p>{data.name}</p>
                    <p>{data.category}</p>
                    <p>${data.price}</p>
                    <p onClick={() => removeFood(data._id)} className='cursor'>X</p>
                </div>
            ))}

        </div>
    )
}

export default List