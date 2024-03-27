import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Sidebar from "../Component/Sidebar.jsx";
import { Link } from 'react-router-dom';

function Book() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Book');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Features Items</h2>
                                {currentBooks.map(book => (
                                    <div className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={'/images/shop/' + book.ImageUrl} alt="" />
                                                    <h2>{book.Price.toLocaleString('vi-VN')} VND</h2>
                                                    <p>{book.Name}</p>
                                                    <Link to={"/BookDetail/" + book.Id} href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-info-circle" />
                                                        Sản phẩm chi tiết
                                                    </Link>
                                                </div>
                                                <div className="product-overlay">
                                                    <div className="overlay-content">
                                                        <h2>{book.Price.toLocaleString('vi-VN')} VND</h2>
                                                        <p>{book.Name}</p>
                                                        {/* <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a> */}
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
                                <div className="col-sm-12">
                                    <ul className="pagination" style={{ marginLeft: '350px' }}>
                                        {/* Render previous page button */}
                                        <li className={currentPage === 1 ? 'disabled' : ''}>
                                            <a href="#" onClick={() => paginate(currentPage - 1)}>«</a>
                                        </li>
                                        {/* Render page numbers */}
                                        {Array.from({ length: Math.min(Math.ceil(books.length / booksPerPage), 3) }, (_, i) => (
                                            <li key={currentPage + i} className={currentPage === currentPage + i ? 'active' : ''}>
                                                <a href="#" onClick={() => paginate(currentPage + i)}>{currentPage + i}</a>
                                            </li>
                                        ))}
                                        {/* Render next page button */}
                                        <li className={currentPage === Math.ceil(books.length / booksPerPage) ? 'disabled' : ''}>
                                            <a href="#" onClick={() => paginate(currentPage + 1)}>»</a>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                            {/*features_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default Book;