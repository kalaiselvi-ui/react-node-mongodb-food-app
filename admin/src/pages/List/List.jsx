import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.scss';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [editData, setEditData] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching food list");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error removing food");
        }
    };

    const openEditModal = (food) => {
        setEditData(food);
        setNewCategory(food.category);  // Pre-fill with current category
    };

    const closeEditModal = () => {
        setEditData(null);
        setNewCategory("");
    };

    const updateFoodCategory = async () => {
        if (!newCategory) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axios.put(`${url}/api/food/edit`, {
                id: editData._id,
                category: newCategory,
            });

            if (response.data.success) {
                toast.success("Category updated successfully");
                fetchList();
                closeEditModal();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating category");
        }
    };

    return (
        <div className='list add'>
            <p className='main-title'>All Foods</p>
            <div className='list-table-format title'>
                <b>ID</b>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Edit</b>
                <b>Action</b>

            </div>
            {list.map((data, index) => (
                <div key={index} className='list-table-format'>
                    <p className='smallsize-id'>{index + 1}</p>
                    <img src={data.image} alt="" />
                    <p>{data.name}</p>
                    <p>{data.category}</p>
                    <p>${data.price}</p>
                    <button className='edit-btn' onClick={() => openEditModal(data)}>edit</button>
                    <p onClick={() => removeFood(data._id)} className='cursor'>X</p>
                </div>
            ))}

            {/* Edit Category Modal */}
            {editData && (
                <div className="edit-modal">
                    <div className="modal-content">
                        <h3>Edit Category</h3>
                        <p>Editing: <strong>{editData.name}</strong></p>
                        <select name="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                        <div className='button-group'>
                            <button className='update-btn' onClick={updateFoodCategory}>Update</button>
                            <button className='cancel-btn' onClick={closeEditModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
