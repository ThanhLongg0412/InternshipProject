import React, { Fragment, useEffect, useState, Component } from 'react';
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Table from 'react-bootstrap/Table';
import './styles.css'
import { useParams } from 'react-router-dom';

import axios from 'axios';


function SubCategory() {

    const { id } = useParams();
    // console.log(id);
    const [categories, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Category/id=${id}`);
                setCategory(response.data);

                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [id]);

    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(id);
    // console.log(parentId);

    const handleSubmitSub = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/Category', {
                name: name,
                parentId: parentId
            });

            // console.log(response.data);

            window.location.reload();

            console.log('Category added successfully:', response.data);
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    useEffect(() => {
        setParentId(id); // Cập nhật parentId khi id thay đổi từ useParams()
    }, [id]);

    console.log("parentId:", parentId);



    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleEditButtonClick = async (id) => {
        try {
            // Gọi API để lấy dữ liệu category có id tương ứng
            const response = await axios.get(`http://localhost:5000/api/Category/id=${id}`);
            // console.log(response);

            if (response.data) {

                // Cập nhật state với dữ liệu category
                setSelectedCategory(response.data);
                // Lưu id của category được chọn
                setSelectedCategoryId(id);
            } else {
                console.error('No data returned from the API');
            }
        } catch (error) {
            console.error('Error while fetching category data:', error);
        }
    };


    // Function để lưu thay đổi
    const handleSaveChanges = async () => {
        // Gọi API để lưu thay đổi cho category có id là selectedCategoryId
        try {
            await axios.put(`http://localhost:5000/api/Category/id=${selectedCategoryId}`, selectedCategory);
            console.log(selectedCategoryId);
            // Đóng modal khi lưu thành công
            // document.getElementById('editcategory').modal('hide');
            window.location.reload();
            // Tải lại dữ liệu categories
            // CODE ĐỂ TẢI LẠI DỮ LIỆU CATEGORIES (nếu cần)
        } catch (error) {
            console.error('Error while saving changes:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            // Gọi API để xóa category có id tương ứng
            await axios.delete(`http://localhost:5000/api/Category/id=${id}`);

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
        <Fragment>
            <div className="sb-nav-fixed" onLoad={startTime}>
                <Header />
                <div id="layoutSidenav">
                    <Navbar />
                    <div id="layoutSidenav_content">

                        <main>
                            <div className="container-fluid px-4">
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
                                            <div>Quản lý danh mục con</div>
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
                                                    <i className="fa-solid fa-table-list" />
                                                    Danh mục
                                                </div>
                                                {CURRENT_TYPE_USER === "Admin" && (
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary add-payment"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#addcategory"
                                                        >
                                                            <i className="fa-solid fa-plus" />
                                                            Thêm danh mục
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <Table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Tên danh mục</th>
                                                        {CURRENT_TYPE_USER === "Admin" && (
                                                            <th>Hành động</th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories && categories.map(category => (
                                                        <tr key={category.Id}>
                                                            <td>{category.Name}
                                                            </td>
                                                            {/* <td>{category.ParentId.Name}</td> */}
                                                            {CURRENT_TYPE_USER === "Admin" && (
                                                                <td>
                                                                    {/* Button trigger modal */}
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-warning"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#editcategory"
                                                                        style={{ marginRight: "15px" }}
                                                                        onClick={() => handleEditButtonClick(category.Id)}

                                                                    >
                                                                        <i className="fa-regular fa-pen-to-square" />
                                                                    </button>
                                                                    <button className="btn btn-danger" style={{ marginRight: "15px" }}
                                                                        onClick={() => handleDeleteCategory(category.Id)}
                                                                    >
                                                                        <i className="fa-solid fa-trash" />
                                                                    </button>
                                                                </td>
                                                            )}
                                                        </tr>

                                                    ))}
                                                    {/* </>
                                                    )} */}

                                                </tbody>

                                            </Table>
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
                            id="editcategory"
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
                                            Cập nhật danh mục
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
                                            <label htmlFor="name_pay_edit" className="form-label">
                                                Tên danh mục
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                // id="name_pay_edit"
                                                value={selectedCategory.Name}
                                                onChange={(e) => setSelectedCategory({ ...selectedCategory, Name: e.target.value })}
                                            />
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
                                        <button type="button" onClick={handleSaveChanges} className="btn btn-primary">
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal fade"
                            id="addcategory"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex={-1}
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <form className="modal-content" onSubmit={handleSubmitSub}>
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="addBackdropLabel">
                                            Thêm danh mục
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <input type="hidden" id="id_pay_add" />
                                        <div className="mb-3">
                                            <label htmlFor="name_pay_add" className="form-label">
                                                Tên danh mục mới
                                            </label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

                                        </div>
                                        <div className="mb-3">
                                            {/* <label htmlFor="name_pay_add" className="form-label">
                                                Tên danh mục mới
                                            </label> */}
                                            <input type="hidden" className="form-control" value={parentId} />

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
                                        <button className="btn btn-primary">
                                            Thêm mới
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>

                    {/*    Modal*/}
                </div>
            </div>
        </Fragment>
    );
}

export default SubCategory;