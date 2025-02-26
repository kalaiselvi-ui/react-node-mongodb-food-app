import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Add.scss';

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        setData((data) => ({ ...data, [name]: value }))
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append("name", data.name);
        // formData.append("description", data.description);
        // formData.append("price", Number(data.price));
        // formData.append("category", data.category);
        // formData.append("image", image);  
        for (const key in data) {
            formData.append(key, data[key])
        }
        if (image) {
            formData.append("image", image)
        }

        const response = await axios.post(`${url}/api/food/add`, formData)
        console.log(response, 'res');
        if (response.data?.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else {
            console.log("Failed to create food Product")
            toast.error(response.data.message)
        }

    }

    return (
        <div className='add'>
            <form action="" className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" value={data.name} onChange={onChangeHandler} placeholder='Type here' name='name' />

                </div>
                <div className="add-product-desc flex-col">
                    <p>Product Description</p>
                    <textarea value={data.description} onChange={onChangeHandler} rows="6" name='description' placeholder="Write content here" ></textarea>

                </div>
                <div className="add-product-price flex-col">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select name="category" id="" onChange={onChangeHandler} >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-button'>ADD</button>
            </form>

        </div>
    )
}

export default Add