import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Verify.scss';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { url, setCartItems } = useContext(StoreContext);

    const success = searchParams.get('success');
    const orderId = searchParams.get("orderId");
    console.log(success, orderId)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });

        if (response.data.success) {
            // localStorage.removeItem("tokenfood");
            // setCartItems({});
            navigate('/myorders')
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])


    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    )
}

export default Verify