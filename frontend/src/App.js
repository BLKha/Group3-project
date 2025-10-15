import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:3000/users", newUser); // Lấy response từ backend
      setUsers([...users, response.data]); // Thêm user vào state ngay lập tức
      fetchUsers(); // Đồng bộ với backend
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản Lý User</h1>
        <div className="form-container">
          <AddUser onAdd={handleAddUser} />
        </div>
        <div className="user-list-container">
          <UserList users={users} />
        </div>
      </header>
    </div>
  );
}

export default App;