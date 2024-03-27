import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/Admin/login', {
                username,
                password,
            });
            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem('roleName', response.data.roleName)
                localStorage.setItem('loggedIn', true);

                alert(localStorage.getItem('roleName'))
                window.location.reload();
            }
            else {
                console.log("Login failed:", response); // Log response để kiểm tra lỗi
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password.');
        }
    };

    if (localStorage.getItem('loggedIn') === 'true') {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-primary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">
                                                Đăng nhập
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputUsername"
                                                        type="text"
                                                        placeholder="Username"
                                                        value={username}
                                                        onChange={handleUsernameChange}
                                                    />
                                                    <label htmlFor="inputUsername">Username</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputPassword"
                                                        type="password"
                                                        placeholder="Mật khẩu"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <label htmlFor="inputPassword">Mật khẩu</label>
                                                </div>
                                                {error && <div className="text-danger">{error}</div>}
                                                <div
                                                    className=" align-items-center justify-content-between mt-4 mb-0"
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <button
                                                        className="btn btn-primary d-grid gap-2 col-6 mx-auto btn-lg"
                                                        type="button"
                                                        onClick={handleLogin}
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Login;