import React, { useState, useEffect } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import { Link } from "react-router-dom";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/Order")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleApproveOrder = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/Order/idd=${id}`
      );
      if (response.data) {
        setSelectedOrder(response.data);
        setSelectedStatus(response.data.Status);
      } else {
        console.error("No data returned from the API");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error approving order:", error);
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
                  marginTop: 10,
                }}
              >
                <ol className="breadcrumb mb-2">
                  <li
                    className="breadcrumb-item active"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <div>Quản lý thông tin đơn hàng</div>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginTop: 5 }}>
                        <i className="fa-solid fa-receipt" /> Đơn hàng
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>PTTT</th>
                          <th>Trạng thái</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr>
                            <td key={order.id}>
                              {(() => {
                                if (order.NameCustomer === null) {
                                  return order.CustomerName;
                                } else {
                                  return order.NameCustomer;
                                }
                              })()}
                            </td>
                            <td>
                              {(() => {
                                if (order.PhoneNumber === null) {
                                  return order.CustomerPhone;
                                } else {
                                  return order.PhoneNumber;
                                }
                              })()}
                            </td>
                            <td>
                              {(() => {
                                if (order.Address === null) {
                                  return order.CustomerAddress;
                                } else {
                                  return order.Address;
                                }
                              })()}
                            </td>
                            <td>{order.PaymentMethodName}</td>
                            <td>
                              {(() => {
                                if (order.Status == 1) {
                                  return "Chờ xử lý";
                                } else if (order.Status == 2) {
                                  return "Đã duyệt";
                                } else if (order.Status == 3) {
                                  return "Đang giao hàng";
                                } else if (order.Status == 4) {
                                  return "Hoàn thành";
                                } else if (order.Status == 5) {
                                  return "Hủy đơn hàng";
                                }
                              })()}
                            </td>
                            <td>
                              <button
                                type="submit"
                                className="btn btn-success"
                                // data-bs-toggle="modal"
                                // data-bs-target="#edit_order"
                                onClick={() => handleApproveOrder(order.Id)}
                                style={{ marginRight: "15px" }}
                              >
                                <i className="far fa-check-square" />
                              </button>
                              <Link
                                to={"/OrderDetail/" + order.Id}
                                type="button"
                                className="btn btn-info"
                                // data-bs-toggle="modal"
                                // data-bs-target="#edit_book"
                                style={{
                                  marginRight: "15px",
                                  marginLeft: "15px",
                                }}
                                // onClick={() => handleEditButtonClick(book.Id)}
                              >
                                <i className="fa-solid fa-circle-info" style={{ color: "white" }}></i>
                              </Link>
                            </td>
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
      </div>
    </div>
  );
}

export default Order;

// import React, { useState, useEffect } from "react";
// import Header from "../../Component/header";
// import Navbar from "../../Component/nav";
// import Footer from "../../Component/footer";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Order() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/Order")
//       .then((response) => response.json())
//       .then((data) => setOrders(data))
//       .catch((error) => console.error("Error fetching orders:", error));
//   }, []);

//   useEffect(() => {
//     startTime();
//   }, []);

//   function startTime() {
//     // Lấy Object ngày hiện tại
//     const today = new Date();

//     // Giờ, phút, giây hiện tại
//     let h = today.getHours();
//     let m = today.getMinutes();
//     let s = today.getSeconds();

//     // Ngày hiện tại
//     const curDay = today.getDate();

//     // Tháng hiện tại
//     const curMonth = today.getMonth() + 1;

//     // Năm hiện tại
//     const curYear = today.getFullYear();

//     const curDw = today.getDay();

//     // Chuyển đổi sang dạng 01, 02, 03
//     m = checkTime(m);
//     s = checkTime(s);

//     // Ghi ra trình duyệt
//     const timerElement = document.getElementById("timer");
//     if (timerElement) {
//       timerElement.innerHTML =
//         "Thứ " +
//         curDw +
//         ", " +
//         curDay +
//         "/" +
//         curMonth +
//         "/" +
//         curYear +
//         "    -   " +
//         h +
//         " giờ " +
//         m +
//         " phút " +
//         s +
//         " giây ";
//     }

//     // Dùng hàm setTimeout để thiết lập gọi lại 0.5 giây / lần
//     var t = setTimeout(function () {
//       startTime();
//     }, 500);
//   }

//   // Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
//   function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     }
//     return i;
//   }

//   return (
//     <div className="sb-nav-fixed" onLoad={startTime}>
//       <Header />
//       <div id="layoutSidenav">
//         <Navbar />
//         <div id="layoutSidenav_content">
//           <main>
//             <div className="container-fluid px-4">
//               <div
//                 className="card border-left-primary shadow h-100 py-1"
//                 style={{
//                   borderLeft: "0.25rem solid orange !important",
//                   textAlign: "center",
//                   marginTop: 10,
//                 }}
//               >
//                 <ol className="breadcrumb mb-2">
//                   <li
//                     className="breadcrumb-item active"
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginLeft: 10,
//                     }}
//                   >
//                     <div>Quản lý thông tin đơn hàng</div>
//                     <div />
//                     <div style={{ marginLeft: 750 }}>
//                       <div id="current-time" />
//                       <div>
//                         <div id="timer" />
//                       </div>
//                     </div>
//                   </li>
//                 </ol>
//               </div>
//               <div style={{ marginTop: 10 }} />
//               <main>
//                 <div className="card mb-4">
//                   <div className="card-header">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div style={{ marginTop: 5 }}>
//                         <i className="fa-solid fa-receipt" /> Đơn hàng
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <table className="table table-hover">
//                       <thead>
//                         <tr>
//                           <th>Tên khách hàng</th>
//                           <th>Số điện thoại</th>
//                           <th>Địa chỉ</th>
//                           <th>PTTT</th>
//                           <th>Trạng thái</th>
//                           <th>Hành động</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {orders.map((order) => (
//                           <tr>
//                             <td key={order.id}>
//                               {(() => {
//                                 if (order.NameCustomer == null) {
//                                   return order.CustomerName;
//                                 } else {
//                                   return order.NameCustomer;
//                                 }
//                               })()}
//                             </td>
//                             <td>
//                               {(() => {
//                                 if (order.PhoneNumber == null) {
//                                   return order.CustomerPhone;
//                                 } else {
//                                   return order.PhoneNumber;
//                                 }
//                               })()}
//                             </td>
//                             <td>
//                               {(() => {
//                                 if (order.Address == null) {
//                                   return order.CustomerAddress;
//                                 } else {
//                                   return order.Address;
//                                 }
//                               })()}
//                             </td>
//                             <td>{order.PaymentMethodName}</td>
//                             <td>
//                               {(() => {
//                                 if (order.Status == 1) {
//                                   return "Chờ xử lý";
//                                 } else if (order.Status == 2) {
//                                   return "Đã duyệt";
//                                 } else if (order.Status == 3) {
//                                   return "Đang giao hàng";
//                                 } else if (order.Status == 4) {
//                                   return "Hoàn thành";
//                                 } else if (order.Status == 5) {
//                                   return "Hủy đơn hàng";
//                                 }
//                               })()}
//                             </td>
//                             <td>
//                               <button
//                                 type="button"
//                                 className="btn btn-success"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit_order"
//                               >
//                                 <i className="fa-regular fa-pen-to-square" />
//                               </button>
//                               <Link
//                                 to={"/OrderDetail/" + order.Id}
//                                 type="button"
//                                 className="btn btn-info"
//                                 // data-bs-toggle="modal"
//                                 // data-bs-target="#edit_book"
//                                 style={{
//                                   marginRight: "15px",
//                                   marginLeft: "15px",
//                                 }}
//                                 // onClick={() => handleEditButtonClick(book.Id)}
//                               >
//                                 <i className="fa-solid fa-circle-info"></i>
//                               </Link>
//                               <button className="btn btn-danger">
//                                 <i className="fa-solid fa-trash" />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </main>
//             </div>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Order;
