import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from 'axios';


function Checkout() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (itemId) => {
        let updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload(); // Reload the page to reflect changes
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        let updatedCart;
        if (newQuantity < 1) {
            updatedCart = cart.filter(item => item.id !== itemId);
        } else {
            updatedCart = cart.map(item => {
                if (item.id === itemId) {
                    item.quantity = newQuantity;
                }
                return item;
            });
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const [paymentOptions, setPaymentOptions] = useState([]);

    useEffect(() => {
        fetchPaymentOptions();
    }, []);

    const fetchPaymentOptions = () => {
        axios.get('http://localhost:5000/api/Payment')
            .then(response => {
                setPaymentOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching payment options:', error);
            });
    };

    return (
        <>
            <Header />
            {/*/header*/}
            <section id="cart_items">
                <form className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li className="active">Check out</li>
                        </ol>
                    </div>
                    {/*/register-req*/}
                    <div className="shopper-informations">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="shopper-info" style={{ marginBottom: '30px' }}>
                                    <p>Check out</p>
                                    <form>
                                        <input type="text" placeholder="Full Name" />
                                        <input type="text" placeholder="Phone Number" />
                                        <input type="text" placeholder="Adress" />
                                    </form>
                                    {/* <a className="btn btn-primary" href="">
                                        Get Quotes
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-payment">
                        <h2>Review &amp; Payment</h2>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    {/* <td /> */}
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr>
                                        <input type="hidden" value={item.id} />
                                        <td className="cart_product" style={{ marginRight: "10px" }}>
                                            <a href="">
                                                <img src={'/images/shop/' + item.imageUrl} alt="" style={{ width: "100px" }} />
                                            </a>
                                        </td>
                                        <td className="cart_description">
                                            <h4>
                                                <a href="">{item.name}</a>
                                            </h4>

                                        </td>
                                        <td className="cart_price">
                                            <p>{item.price.toLocaleString('vi-VN')} VND</p>
                                        </td>
                                        <td className="cart_quantity">
                                            <div className="cart_quantity_button" style={{ textAlign: "center", paddingRight: "30px" }}>
                                                {/* <a className="cart_quantity_up" href="">
                                                {" "}
                                                +{" "}
                                            </a> */}
                                                {item.quantity}
                                                {/* <a className="cart_quantity_down" href="">
                                                {" "}
                                                -{" "}
                                            </a> */}
                                            </div>
                                        </td>
                                        <td className="cart_total">
                                            <p className="cart_total_price">{formatCurrency(item.price * item.quantity)}</p>
                                        </td>
                                        {/* <td className="cart_delete">
                                        <a className="cart_quantity_delete" href="">
                                            <i className="fa fa-times" />
                                        </a>
                                    </td> */}
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}>&nbsp;</td>
                                    <td colSpan={2}>
                                        <table className="table table-condensed total-result">
                                            <tbody>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>
                                                        <span>{formatCurrency(getTotalPrice())}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-options" style={{ marginBottom: "0px" }}>
                        {paymentOptions.map(option => (
                            <span>
                                <label key={option.Id}>
                                    <input type="radio" name="payment_method" value={option.Id} /> {option.Name}
                                </label>
                            </span>
                        ))}
                    </div>
                    <a className="btn btn-primary" href="" style={{ marginBottom: "125px", float: "right" }}>
                        Continue
                    </a>
                </form>
            </section>{" "}
            {/*/#cart_items*/}
            <Footer />
        </>

    )
}

export default Checkout;