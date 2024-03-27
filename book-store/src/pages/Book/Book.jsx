import React, { Fragment, useEffect, useState, Component } from 'react';
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Book() {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/api/Book')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            // Gọi API để xóa category có id tương ứng
            await axios.delete(`http://localhost:5000/api/Book/id=${id}`);

            // Tải lại trang sau khi xóa thành công
            window.location.reload();
        } catch (error) {
            console.error('Error while deleting category:', error);
        }
    };

    useEffect(() => {
        startTime();
    }, []);

    function startTime() {
        // Lấy Object ngày hiện tại
        const today = new Date();

        // Giờ, phút, giây hiện tại
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        // Ngày hiện tại
        const curDay = today.getDate();

        // Tháng hiện tại
        const curMonth = today.getMonth() + 1;

        // Năm hiện tại
        const curYear = today.getFullYear();

        const curDw = today.getDay();

        // Chuyển đổi sang dạng 01, 02, 03
        m = checkTime(m);
        s = checkTime(s);

        // Ghi ra trình duyệt
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML =
                "Thứ " +
                curDw +
                ", " +
                curDay +
                "/" +
                curMonth +
                "/" +
                curYear +
                "    -   " +
                h +
                " giờ " +
                m +
                " phút " +
                s +
                " giây ";
        }

        // Dùng hàm setTimeout để thiết lập gọi lại 0.5 giây / lần
        var t = setTimeout(function () {
            startTime();
        }, 500);
    }

    // Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    const CURRENT_TYPE_USER = localStorage.getItem('roleName');

    return (
        <div className="sb-nav-fixed" onLoad={startTime}>
            <Header />
            <div id="layoutSidenav">
                <Navbar />
                <div id="layoutSidenav_content">

                    <main>
                        <div className="container-fluid px-4">
                            {/* <h1 className="mt-4">Quản lý thông tin sách</h1> */}
                            <div
                                className="card border-left-primary shadow h-100 py-1"
                                style={{
                                    borderLeft: "0.25rem solid orange !important",
                                    textAlign: "center",
                                    marginTop: 10
                                }}
                            >
                                <ol className="breadcrumb mb-2">
                                    <li
                                        className="breadcrumb-item active"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginLeft: 10
                                        }}
                                    >
                                        <div>Quản lý thông tin sách</div>
                                        <div />
                                        <div style={{ marginLeft: 750 }}>
                                            <div id="current-time" />
                                            <div>
                                                <div id="timer" />
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div style={{ marginTop: 10 }} />
                            <main>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ marginTop: 5 }}>
                                                <i className="fa-solid fa-book"></i> Sách
                                            </div>
                                            {CURRENT_TYPE_USER === "Admin" && (
                                            <div>
                                                <Link
                                                    to={"/AddBook"}
                                                    type="button"
                                                    className="btn btn-primary add-payment"
                                                // data-bs-toggle="modal"
                                                // data-bs-target="#add_book"
                                                >
                                                    <i className="fa-solid fa-plus" style={{ paddingLeft: "10px" }}></i>Thêm sách
                                                </Link>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr style={{ textAlign: 'center' }}>
                                                    <th>ISBN</th>
                                                    <th>Tên sách</th>
                                                    <th>Giá</th>
                                                    <th>Ảnh</th>
                                                    <th>NXB</th>
                                                    <th>Nhà xản xuất</th>
                                                    <th>Tác giả</th>
                                                    <th>Danh mục</th>
                                                    {CURRENT_TYPE_USER === "Admin" && (
                                                    <th>Hành động</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {books.map(book => (
                                                    <tr key={book.Id} style={{ textAlign: 'center', padding: '50px' }}>
                                                        <td width={"15px"}>{book.Isbn}</td>
                                                        <td width={"150px"}>{book.Name}</td>
                                                        <td width={"150px"}>{book.Price.toLocaleString('vi-VN')} VND</td>
                                                        <td width={'50px'}><img src={'assets/img/' + book.ImageUrl} width={'100px'} height={'100px'} /> </td>
                                                        <td width={"100px"}>{book.PublishYear.split('-')[0]}</td>
                                                        <td width={"150px"}>{book.Publisher}</td>
                                                        <td width={"250px"}>{book.Author}</td>
                                                        <td width={"150px"}>{book.CategoryName}</td>
                                                        {CURRENT_TYPE_USER === "Admin" && (
                                                        <td width={'225px'}>
                                                            <Link to={'/EditBook/' + book.Id}
                                                                type="button"
                                                                className="btn btn-success"
                                                                // data-bs-toggle="modal"
                                                                // data-bs-target="#edit_book"
                                                                style={{ marginRight: '15px' }}
                                                            // onClick={() => handleEditButtonClick(book.Id)}
                                                            >
                                                                <i className="fa-regular fa-pen-to-square" />
                                                            </Link>
                                                            <button className="btn btn-danger" onClick={() => handleDeleteCategory(book.Id)} style={{ marginRight: '15px' }}>
                                                                <i className="fa-solid fa-trash" />
                                                            </button>
                                                            {/* <button
                                                                type="button"
                                                                className="btn btn-info"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#details_book"
                                                                style={{ marginRight: '15px' }}
                                                            >
                                                                <i
                                                                    className="fa-solid fa-circle-info"
                                                                    style={{ color: "white" }}
                                                                />
                                                            </button> */}
                                                        </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </main>


                    <Footer />
                </div>

                {/*Modal*/}

                <>
                    <div
                        className="modal fade"
                        id="edit_book"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editBackdropLabel">
                                        Cập nhật thông tin sách
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" id="id_pay_edit" />
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Mã ISBN
                                        </label>
                                        <input type="text" className="form-control" id="phone" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name_em_edit" className="form-label">
                                            Tên sách
                                        </label>
                                        <input type="text" className="form-control" id="name_em_edit" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cate" className="form-label">
                                            Danh mục
                                        </label>
                                        <input type="text" className="form-control" id="cate" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Giá
                                        </label>
                                        <input type="number" className="form-control" id="email" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Tải ảnh lên
                                        </label>
                                        <input type="file" className="form-control" id="inputGroupFile01" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="publisher" className="form-label">
                                            Nhà xuất bản
                                        </label>
                                        <input type="text" className="form-control" id="publisher" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="author" className="form-label">
                                            Tác giả
                                        </label>
                                        <input type="text" className="form-control" id="author" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="publish_year" className="form-label">
                                            Năm xuất bản
                                        </label>
                                        <input type="text" className="form-control" id="publish_year" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="des" className="form-label">
                                            Mô tả
                                        </label>
                                        <input type="text" className="form-control" id="des" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="details_book"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="detailsBackdropLabel">
                                        Thông tin chi tiết
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" id="id_book_details" />
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Mã ISBN
                                        </label>
                                        <input type="text" className="form-control" id="phone" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name_em_edit" className="form-label">
                                            Tên sách
                                        </label>
                                        <input type="text" className="form-control" id="name_em_edit" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cate" className="form-label">
                                            Danh mục
                                        </label>
                                        <input type="text" className="form-control" id="cate" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Giá
                                        </label>
                                        <input type="number" className="form-control" id="email" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupFile01">
                                            Tải ảnh lên
                                        </label>
                                        <input type="file" className="form-control" id="inputGroupFile01" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="publisher" className="form-label">
                                            Nhà xuất bản
                                        </label>
                                        <input type="text" className="form-control" id="publisher" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="author" className="form-label">
                                            Tác giả
                                        </label>
                                        <input type="text" className="form-control" id="author" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="publish_year" className="form-label">
                                            Năm xuất bản
                                        </label>
                                        <input type="text" className="form-control" id="publish_year" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="des" className="form-label">
                                            Mô tả
                                        </label>
                                        <input type="text" className="form-control" id="des" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                {/*Modal*/}
            </div>
        </div>
    );
}

export default Book;
