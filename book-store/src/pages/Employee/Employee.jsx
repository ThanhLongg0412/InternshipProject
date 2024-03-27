import React, { useState, useEffect } from 'react';
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function Employee() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Admin');
                setAdmins(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);


    // Thêm admin
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [roleName, setRoleName] = useState(null);
    const [roleId, setRoleId] = useState(0);
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu role khi component được render
        fetch('http://localhost:5000/api/Role')
            .then(response => response.json())
            .then(data => setRoleOptions(data))
            .catch(error => console.error('Error fetching roles:', error));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/Admin', {
                username,
                password,
                email,
                fullName,
                roleId,
                roleName
            });

            console.log(response);

            console.log('Admin added successfully!');

            // Change window location to '/admin'
            window.location.reload();

        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    const [selectedAdmin, setSelectedAdmin] = useState({
        id: '',
        fullName: '',
        username: '',
        email: '',
        password: '',
        roleId: 0, // Khởi tạo với giá trị mặc định
        roleName: '',
    });


    const handleEditButtonClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/Admin/id=${id}`);

            if (response.data) {
                setSelectedAdmin(response.data);
            } else {
                console.error('No data returned from the API');
            }
        } catch (error) {
            console.error('Error while fetching admin data:', error);
        }
    };

    const handleEditRoleChange = (e) => {
        const selectedRoleName = e.target.value;
        const selectedRole = roleOptions.find((role) => role.Name === selectedRoleName);
        if (selectedRole) {
            setSelectedAdmin({ ...selectedAdmin, RoleName: selectedRoleName, RoleId: selectedRole.Id });
        }
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/api/Admin/id=${selectedAdmin.Id}`, selectedAdmin);
            // window.location.reload();
            // Navigate('/customer');
        } catch (error) {
            console.error('Error while saving changes:', error);
        }

        console.log(selectedAdmin);
    };



    const handleDeleteCategory = async (id) => {
        try {
            // Gọi API để xóa category có id tương ứng
            await axios.delete(`http://localhost:5000/api/Admin/id=${id}`);

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
                                        <div>Quản lý thông tin nhân viên</div>
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
                                                <i className="fa-solid fa-users" />
                                                Nhân viên
                                            </div>
                                            {CURRENT_TYPE_USER === "Admin" && (
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary add-payment"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#addemployee"
                                                    >
                                                        <i className="fa-solid fa-plus" />
                                                        Thêm nhân viên
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Tên nhân viên</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Quyền</th>
                                                    {CURRENT_TYPE_USER === "Admin" && (
                                                        <th>Hành động</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {admins.map((admin) => (
                                                    <tr key={admin.Id}>
                                                        <td>{admin.FullName}</td>
                                                        <td>{admin.Username}</td>
                                                        <td>{admin.Email}</td>
                                                        <td>{admin.RoleName}</td>
                                                        {CURRENT_TYPE_USER === "Admin" && (
                                                            <td>
                                                                {/* Button trigger modal */}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#editemployee"
                                                                    style={{ marginRight: "15px" }}
                                                                    onClick={() => handleEditButtonClick(admin.Id)}
                                                                >
                                                                    <i className="fa-regular fa-pen-to-square" />
                                                                </button>
                                                                <button className="btn btn-danger" onClick={() => handleDeleteCategory(admin.Id)}>
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


                {/*    Modal*/}
                <>
                    <div
                        className="modal fade"
                        id="editemployee"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <form className="modal-content" onClick={handleSaveChanges}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editBackdropLabel">
                                        Cập nhật nhân viên
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" value={selectedAdmin?.Id} id="id_pay_edit" />
                                    <div className="mb-3">
                                        <label htmlFor="name_em_edit" className="form-label">
                                            Tên nhân viên
                                        </label>
                                        <input type="text" className="form-control" value={selectedAdmin?.FullName}
                                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, FullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Username
                                        </label>
                                        <input type="text" className="form-control" value={selectedAdmin?.Username}
                                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, Username: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input type="text" className="form-control" value={selectedAdmin?.Email}
                                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, Email: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" className="form-control" value={selectedAdmin?.Password}
                                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, Password: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">
                                            Quyền
                                        </label>

                                        <select className="form-select" value={selectedAdmin?.RoleName} onChange={handleEditRoleChange} required>
                                            <option value={0}>-- Chọn vai trò --</option>
                                            {roleOptions.map(option => (
                                                <option key={option.Id} value={option.Name}>{option.Name}</option>
                                            ))}
                                        </select>
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
                                    <button type="submit" className="btn btn-primary">
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="addemployee"
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
                                        Thêm nhân viên
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="name_em_edit" className="form-label">
                                            Tên nhân viên
                                        </label>
                                        <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Username
                                        </label>
                                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label" >
                                            Email
                                        </label>
                                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Vai trò
                                        </label>
                                        <select className="form-select" value={roleId} onChange={(e) => {
                                            setRoleId(e.target.value);
                                            const selectedRole = roleOptions.find(option => option.Id === parseInt(e.target.value));
                                            setRoleName(selectedRole ? selectedRole.Name : null);
                                        }} required>
                                            <option value={0}>-- Chọn vai trò --</option>
                                            {roleOptions.map(option => (
                                                <option key={option.Id} value={option.Id}>{option.Name}</option>
                                            ))}
                                        </select>
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
                                    <button type="submit" className="btn btn-primary">
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

export default Employee;
