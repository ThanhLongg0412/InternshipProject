import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

class Navbar extends React.Component {

    render() {
        return (
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav
                        className="sb-sidenav accordion sb-sidenav-dark"
                        id="sidenavAccordion"
                    >
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <Link to={"/"} className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt"></i>
                                    </div>
                                    Bảng điều khiển
                                </Link>
                                <div className="sb-sidenav-menu-heading">Quản lý</div>
                                <Link className="nav-link" to={"/employee"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-regular fa-address-card"></i>
                                    </div>
                                    Quản lý nhân viên
                                </Link>
                                <Link className="nav-link" to={"/Customer"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    Quản lý khách hàng
                                </Link>
                                <Link className="nav-link" to={"/category"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-layer-group"></i>
                                    </div>
                                    Quản lý danh mục
                                </Link>
                                <Link className="nav-link" to={"/book"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-book-open"></i>
                                    </div>
                                    Quản lý sách
                                </Link>
                                <Link className="nav-link" to={"/order"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-regular fa-calendar-check"></i>
                                    </div>
                                    Quản lý đơn hàng
                                </Link>
                                <Link className="nav-link" to={"/payment"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-brands fa-paypal"></i>
                                    </div>
                                    Quản lý PTTT
                                </Link>
                                <Link className="nav-link" to={"/Role"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-brands fa-critical-role"></i>
                                    </div>
                                    Quản lý vai trò
                                </Link>
                                <Link className="nav-link" to={"/permisstion"}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-brands fas fa-lock"></i>
                                    </div>
                                    Quản lý quyền
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Navbar;