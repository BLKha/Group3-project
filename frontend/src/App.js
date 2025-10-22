// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './component/Auth';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  // Lấy token từ localStorage khi khởi tạo, nếu không có thì là null
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUsers = async () => {
    // Chỉ fetch users nếu có token
    if (!token) return; 
    try {
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu users:", error);
      // Xử lý lỗi token hết hạn hoặc không hợp lệ: tự động đăng xuất
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        handleLogout(); 
      }
    }
  };

  useEffect(() => {
    // Gọi fetchUsers mỗi khi token thay đổi (đăng nhập/đăng xuất)
    if (token) {
      fetchUsers();
    } else {
      setUsers([]); // Xóa danh sách users nếu không có token
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:3001/users", newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Hàm đăng xuất: xóa token và đặt lại state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsers([]); // Xóa danh sách user khi đăng xuất
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Quản Lý User</h1>

          {/* Sửa logic render ở đây */}
          {!token ? (
            // Nếu CHƯA có token (chưa đăng nhập), chỉ hiển thị Auth component
            <Auth onAuth={setToken} />
          ) : (
            // Nếu ĐÃ CÓ token (đã đăng nhập), hiển thị nút Đăng Xuất và các chức năng quản lý user
            <>
              {/* Nút Đăng Xuất */}
              <button
                onClick={handleLogout}
                className="btn-delete" // Sử dụng lại class btn-delete cho màu đỏ
                style={{ maxWidth: '200px', margin: '0 auto 20px' }} // CSS tùy chỉnh cho nút
              >
                Đăng Xuất
              </button>

              {/* Các route và component quản lý user */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="form-container">
                        <AddUser
                          onAdd={handleAddUser}
                          editingUser={editingUser}
                          onUpdate={handleUpdateUser}
                          onCancelEdit={handleCancelEdit}
                        />
                      </div>
                      <div className="user-list-container">
                        <UserList
                          users={users}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </div>
                    </>
                  }
                />
              </Routes>
            </>
          )}

        </header>
      </div>
    </Router>
  );
}

export default App;