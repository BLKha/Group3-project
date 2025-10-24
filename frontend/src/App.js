import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import './styles/App.css';
import './styles/buttons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './component/Auth';
import Profile from './component/Profile';
import { Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu users:", error);
    }
  };

  useEffect(() => {
    // Khi token thay đổi, lưu vào localStorage và lấy users
    if (token) {
      localStorage.setItem('token', token);
      fetchUsers();
      // Fetch current user's profile to show logged-in name
      (async () => {
        try {
          const res = await axios.get('http://localhost:3001/profile', { headers: { Authorization: `Bearer ${token}` } });
          setCurrentUser(res.data);
        } catch (err) {
          console.error('Không thể lấy profile:', err?.response?.data || err.message);
          setCurrentUser(null);
        }
      })();
    } else {
      localStorage.removeItem('token');
      setUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:3001/users", newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers([...users, response.data]);
      fetchUsers();
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

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Quản Lý User</h1>

          {!token ? (
            <Auth onAuth={setToken} />
          ) : (
            <>
              <div className="header-top">
                <div className="nav-row">
                  <Link to="/" className="btn-link">Home</Link>
                  <Link to="/profile" className="btn-link">Profile</Link>
                  <button onClick={() => { setToken(null); setCurrentUser(null); }} className="btn-delete">Đăng Xuất</button>
                </div>

                <div className="login-row">
                  Đang đăng nhập: {currentUser ? currentUser.name : '...'}
                </div>
              </div>

              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="main-content">
                        <div className="left-pane">
                          <div className="form-container">
                            <AddUser
                              onAdd={handleAddUser}
                              editingUser={editingUser}
                              onUpdate={handleUpdateUser}
                              onCancelEdit={handleCancelEdit}
                            />
                          </div>
                        </div>

                        <div className="right-pane">
                          <div className="user-list-container">
                            <UserList
                              users={users}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  }
                />
                <Route path="/profile" element={<Profile token={token} currentUser={currentUser} />} />
              </Routes>
            </>
          )}

        </header>
      </div>
    </Router>
  );
}

export default App;