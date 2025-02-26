import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:3000"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    // console.log(cartItems, 'cartiyem')


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
            // console.log(cartItems, 'cart');

            // setCartItems((prev) => ({
            //     ...prev,
            //     [itemId]: (prev[itemId] || 0) + 1,
            // }))
        }
    }
    const removeFromCart = async (itemId) => {
        // setCartItems((prev) => ({
        //     ...prev,
        //     [itemId]: (prev[itemId] || 0) - 1,
        // }))
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    const loadCartData = async (token) => {
        const response = await axios.get(url + "/api/cart/get", { headers: { token } })
        setCartItems(response.data.cartData)
    }


    // useEffect(() => {
    //     console.log(cartItems, 'cart updated')
    // }, [cartItems])

    const getTotalFromCart = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // console.log(cartItems[item])
                let itemInfo = food_list.find(product => product._id === item);
                // console.log(itemInfo, 'iteminfo')
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount

    }

    const getTotalItemCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalCount += cartItems[item];
            }
        }
        return totalCount
    }

    const FetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data);
    }

    useEffect(() => {
        async function loadData() {
            await FetchFoodList();
            if (localStorage.getItem("tokenfood")) {
                setToken(localStorage.getItem("tokenfood"))
                await loadCartData(localStorage.getItem("tokenfood"))
            }
        }
        loadData();
    }, [])

    const contextValue = useMemo(() => ({
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        getTotalFromCart,
        getTotalItemCount,
        url,
        token,
        setToken
    }), [cartItems, token, setToken])
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
