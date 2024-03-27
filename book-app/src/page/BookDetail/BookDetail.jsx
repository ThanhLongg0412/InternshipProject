import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Sidebar from "../../Component/Sidebar";
import './css/animate.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './css/bootstrap.min.css'
// import './css/font-awesome.min.css'
// import './css/prettyPhoto.css'
// import './css/price-range.css'
// import './css/main.css'
// import './css/responsive.css'

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Book/id=${id}`);
                setBook(response.data);

                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (book) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let isAlreadyInCart = false;

            // Check if the item is already in cart
            cart.forEach(item => {
                if (item.id === book.Id) {
                    isAlreadyInCart = true;
                    item.quantity++; // Increase quantity if already in cart
                }
            });

            // If the item is not in cart, add it
            if (!isAlreadyInCart) {
                const cartItem = {
                    id: book.Id,
                    name: book.Name,
                    price: book.Price,
                    quantity: 1,
                    imageUrl: book.ImageUrl
                };
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
        }
    };






    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            {book && (
                                <>
                                    <div className="product-details">
                                        {/*product-details*/}
                                        <div className="col-sm-5">
                                            <div className="view-product">
                                                <img src={'/images/shop/' + book.ImageUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="product-information" style={{ paddingLeft: "20px" }}>
                                                {/*/product-information*/}
                                                <h2>{book.Name}</h2>
                                                <p>{book.Isbn}</p>
                                                <span>
                                                    <span>{book.Price.toLocaleString('vi-VN')} VND</span>
                                                    <label>Quantity:</label>
                                                    <input type="number" defaultValue={1} />
                                                    <button type="button" className="btn btn-fefault cart" onClick={handleAddToCart}>
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </button>
                                                </span>
                                                <p>
                                                    <b>	Năm xuất bản: </b> {book.PublishYear}
                                                </p>
                                                <p>
                                                    <b>	Nhà xản xuất: </b> {book.Publisher}
                                                </p>
                                                <p>
                                                    <b>Tác giả:</b> {book.Author}
                                                </p>
                                            </div>
                                            {/*/product-information*/}
                                        </div>
                                    </div>
                                    {/*/product-details*/}
                                    <div className="category-tab shop-details-tab">
                                        {/*category-tab*/}
                                        <div className="col-sm-12">
                                            <ul className="nav nav-tabs">
                                                <li>
                                                    <a href="#details" data-toggle="tab">
                                                        Mô tả sách
                                                    </a>
                                                </li>
                                                {/* <li>
                                                <a href="#companyprofile" data-toggle="tab">
                                                    Company Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#tag" data-toggle="tab">
                                                    Tag
                                                </a>
                                            </li> */}
                                                <li className="active">
                                                    <a href="#reviews" data-toggle="tab">
                                                        Reviews (5)
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane fade" id="details">
                                                <p style={{ marginLeft: '15px', color: "black" }} dangerouslySetInnerHTML={{ __html: book.Description }}></p>
                                            </div>

                                            <div className="tab-pane fade active in" id="reviews">
                                                <div className="col-sm-12">
                                                    <ul>
                                                        <li>
                                                            <a href="">
                                                                <i className="fa fa-user" />
                                                                EUGEN
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="">
                                                                <i className="fa fa-clock-o" />
                                                                12:41 PM
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="">
                                                                <i className="fa fa-calendar-o" />
                                                                31 DEC 2014
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                                        aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis
                                                        aute irure dolor in reprehenderit in voluptate velit esse
                                                        cillum dolore eu fugiat nulla pariatur.
                                                    </p>
                                                    <p>
                                                        <b>Write Your Review</b>
                                                    </p>
                                                    <form action="#">
                                                        <span>
                                                            <input type="text" placeholder="Your Name" />
                                                            <input type="email" placeholder="Email Address" />
                                                        </span>
                                                        <textarea name="" defaultValue={""} />
                                                        <b>Rating: </b>{" "}
                                                        <img src="images/product-details/rating.png" alt="" />
                                                        <button
                                                            type="button"
                                                            className="btn btn-default pull-right"
                                                        >
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/*/category-tab*/}
                            <div className="recommended_items">
                                {/*recommended_items*/}
                                <h2 className="title text-center">recommended items</h2>
                                <div
                                    id="recommended-item-carousel"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        className="left recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="prev"
                                    >
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a
                                        className="right recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="next"
                                    >
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                            {/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default BookDetail;