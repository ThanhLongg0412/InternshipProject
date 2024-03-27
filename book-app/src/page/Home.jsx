import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Sidebar from "../Component/Sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Book');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Category');
                setCategories(response.data);

                // Set the selectedCategoryId to the ID of the first category
                if (response.data.length > 0) {
                    setSelectedCategoryId(response.data[0].Id);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            if (selectedCategoryId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/Book/GetBookByCatId/id=${selectedCategoryId}`);
                    setSelectedCategoryBooks(response.data);
                } catch (error) {
                    console.error('Error fetching books:', error);
                }
            }
        };

        fetchBooksByCategory();
    }, [selectedCategoryId]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };



    return (
        <>
            <Header />
            <section id="slider">
                {/*slider*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div
                                id="slider-carousel"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <ol className="carousel-indicators">
                                    <li
                                        data-target="#slider-carousel"
                                        data-slide-to={0}
                                        className="active"
                                    />
                                    <li data-target="#slider-carousel" data-slide-to={1} />
                                    <li data-target="#slider-carousel" data-slide-to={2} />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>Free E-Commerce Template</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl1.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>100% Responsive Design</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl2.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>Free Ecommerce Template</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl3.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="#slider-carousel"
                                    className="left control-carousel hidden-xs"
                                    data-slide="prev"
                                >
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a
                                    href="#slider-carousel"
                                    className="right control-carousel hidden-xs"
                                    data-slide="next"
                                >
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/slider*/}
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Features Items</h2>
                                {books.map(book => (
                                    <div className="col-sm-4" key={book.Id}>
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={'/images/shop/' + book.ImageUrl} alt="" />
                                                    <h2>{book.Price.toLocaleString('vi-VN')} VND</h2>
                                                    <p>{book.Name}</p>
                                                    <Link to={"/BookDetail/" + book.Id} href="#" className="btn btn-default add-to-cart">
                                                        <i class="fa fa-info-circle" />
                                                        Sản phẩm chi tiết
                                                    </Link>
                                                </div>
                                                <div className="product-overlay">
                                                    <div className="overlay-content">
                                                        <h2>{book.Price.toLocaleString('vi-VN')} VND</h2>
                                                        <p>{book.Name}</p>
                                                        <Link to={"/BookDetail/" + book.Id} href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-info-circle" />
                                                            Sản phẩm chi tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/*features_items*/}
                            <div className="category-tab">
                                {/*category-tab*/}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        {categories.map(category => (
                                            <li key={category.Id} className={selectedCategoryId === category.Id ? 'active' : ''}>
                                                <a href={`#${category.Id}`} data-toggle="tab" onClick={() => handleCategoryClick(category.Id)}>
                                                    {category.Name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    {categories.map(category => (
                                        <div className={`tab-pane fade ${selectedCategoryId === category.Id ? 'active in' : ''}`} id={category.Id}>
                                            {selectedCategoryBooks.map(book => (
                                                <div className="col-sm-3" key={book.id}>
                                                    <div className="product-image-wrapper">
                                                        <div className="single-products">
                                                            <div className="productinfo text-center">
                                                                <img src={'/images/shop/' + book.ImageUrl} alt="" />
                                                                <h2>{book.Price.toLocaleString('vi-VN')} VND</h2>
                                                                <p>{book.Name}</p>
                                                                {/* <a href="#" className="btn btn-default add-to-cart">
                                                                    <i className="fa fa-shopping-cart" />
                                                                    Add to cart
                                                                </a> */}
                                                                <Link to={"/BookDetail/${book.Id}"} href="#" className="btn btn-default add-to-cart">
                                                                    <i className="fa fa-info-circle" />
                                                                    Sản phẩm chi tiết
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*/category-tab*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default Home;