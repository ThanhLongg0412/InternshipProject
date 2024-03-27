import React, { useEffect, useState } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
function OrderDetail() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/OrderDetail/id=${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        } else {
          console.error(
            "Failed to fetch orderDetails details:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching orderDetails details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

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
                      <th>Tên sách</th>
                      <th>Hình ảnh</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.map((order) => (
                      <tr>
                        <td key={order.id}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={order ? order.BookName : ""}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={order ? order.BookImage : ""}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={order ? order.Amount : ""}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={order ? order.BookPrice : ""}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={order ? order.UnitPrice : ""}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
