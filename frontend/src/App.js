import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  // --- PHẦN MỚI CHO HOẠT ĐỘNG 7 ---
  // State để lưu thông tin user đang được chỉnh sửa
  const [editingUser, setEditingUser] = useState(null); 
  // ------------------------------------

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
      const response = await axios.post("http://localhost:3000/users", newUser);
      // Thêm user mới vào danh sách hiện tại
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  // --- PHẦN MỚI CHO HOẠT ĐỘNG 7 ---

  // Hàm xử lý khi nhấn nút "Xóa"
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      // Lọc bỏ user đã xóa ra khỏi state
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  };
  
  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = (user) => {
    // Set user được chọn vào state editingUser để truyền vào form
    setEditingUser(user);
  };
  
  // Hàm xử lý khi submit form chỉnh sửa
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Gửi request PUT để cập nhật
      const response = await axios.put(`http://localhost:3000/users/${updatedUser._id}`, updatedUser);
      
      // Cập nhật lại danh sách users
      setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
      
      // Reset editingUser để form quay về chế độ "Thêm mới"
      setEditingUser(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingUser(null);
  };
  // ------------------------------------

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản Lý User</h1>
        <div className="form-container">
          {/* --- CẬP NHẬT TRONG JSX --- */}
          <AddUser 
            onAdd={handleAddUser}
            // Truyền user đang sửa và hàm update xuống component AddUser
            editingUser={editingUser}
            onUpdate={handleUpdateUser}
            onCancelEdit={handleCancelEdit}
          />
          {/* --------------------------- */}
        </div>
        <div className="user-list-container">
          {/* --- CẬP NHẬT TRONG JSX --- */}
          <UserList 
            users={users} 
            // Truyền hàm edit và delete xuống component UserList
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {/* --------------------------- */}
        </div>
      </header>
    </div>
  );
}

export default App;