import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../context/StoreContext';
import './Cart.scss';

const Cart = () => {
    const { cartItems, removeFromCart, food_list, getTotalFromCart } = useContext(StoreContext)

    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            console.log(cartItems[item._id], 'items')
                            return (
                                <div key={index}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={item.image} alt="" />
                                        <p className='item-name'>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>$ {item.price * cartItems[item._id]}</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='cart-bottom'>
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>$ {getTotalFromCart()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>$ {getTotalFromCart() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>$ {getTotalFromCart() === 0 ? 0 : getTotalFromCart() + 2}</b>
                        </div>
                    </div>
                    <Button text={"PROCEED TO CHECKOUT"} bgColor={"tomato"} color={"white"} style={{ borderRadius: "4px" }}
                        onClick={() => navigate('/order')} />
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If u have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <Button text={"submit"} type={"submit"} bgColor={"black"} color={"white"} style={{ borderRadius: "4px" }} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Cart