import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";

function Role() {
    // Hiển thị vai trò
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Role');
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching role data:', error);
            }
        };

        fetchRoles();
    }, []);

    // Thêm vai trò
    const [name, setRoleName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/Role', {
                name: name
            });

            window.location.reload();
            // Xử lý thành công nếu cần
            console.log('Role added successfully');
        } catch (error) {
            console.error('Error adding role:', error.message);
        }


    };

    const [selectedRole, setSelectedRole] = useState(null);

    const handleEditButtonClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/Role/id=${id}`);

            if (response.data) {
                setSelectedRole(response.data);
            } else {
                console.error('No data returned from the API');
            }
        } catch (error) {
            console.error('Error while fetching payment data:', error);
        }
    };

    const handleNameChange = (e) => {
        setSelectedRole({ ...selectedRole, Name: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/api/Role/id=${selectedRole.Id}`, selectedRole);
            window.location.reload();
        } catch (error) {
            console.error('Error while saving changes:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            // Gọi API để xóa category có id tương ứng
            await axios.delete(`http://localhost:5000/api/Role/id=${id}`);

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
                                        <div>Quản lý thông tin vai trò</div>
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
                                                <i className="fa-solid fa-receipt" /> Vai trò
                                            </div>
                                            {CURRENT_TYPE_USER === "Admin" && (
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary add-payment"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_order"
                                                >
                                                    <i className="fa-solid fa-plus" /> Thêm vai trò
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Tên vai trò</th>
                                                    {CURRENT_TYPE_USER === "Admin" && (
                                                    <th>Hành động</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles.map((role) => (
                                                    <tr key={role.Id}>
                                                        <td>{role.Name}</td>
                                                        {CURRENT_TYPE_USER === "Admin" && (
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#edit_order"
                                                                style={{ marginRight: "15px" }}
                                                                onClick={() => handleEditButtonClick(role.Id)}
                                                            >
                                                                <i className="fa-regular fa-pen-to-square" />
                                                            </button>
                                                            <button className="btn btn-danger" onClick={() => handleDeleteCategory(role.Id)}>
                                                                <i className="fa-solid fa-trash" />
                                                            </button>
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

                <div
                    className="modal fade"
                    id="edit_order"
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
                                    Cập nhật thông tin đơn hàng
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <input type="hidden" id="id_order_edit" />
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Tên vai trò
                                    </label>
                                    <input type="text" className="form-control" value={selectedRole?.Name} onChange={handleNameChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="name_em_edit" className="form-label">
                                        Địa chỉ nhận hàng
                                    </label>
                                    <input type="text" className="form-control" id="name_em_edit" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cate" className="form-label">
                                        Số điện thoại
                                    </label>
                                    <input type="text" className="form-control" id="cate" />
                                </div> */}
                                {/* <select className="form-select" aria-label="Default select example">
                                    <option selected="">Trạng thái</option>
                                    <option value={1}>Chờ duyệt</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select> */}
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

                <>
                    <div
                        className="modal fade"
                        id="add_order"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <form className="modal-dialog" onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addBackdropLabel">
                                        Thêm đơn hàng mới
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" id="id_order_add" />
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Tên vai trỏ
                                        </label>
                                        <input type="text" className="form-control" value={name}
                                            onChange={(e) => setRoleName(e.target.value)} />
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
                                    <button type='submit' className="btn btn-primary">
                                        Thêm mới
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>

                {/*Modal*/}
            </div>
        </div>
    );
}

export default Role;
