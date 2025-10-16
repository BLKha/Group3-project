import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  // State để lưu thông tin user đang được chỉnh sửa
  const [editingUser, setEditingUser] = useState(null);

  // Hàm lấy danh sách user từ backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu users:", error);
    }
  };

  // Chạy fetchUsers một lần khi component được tải lần đầu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm xử lý khi thêm user mới
  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:3001/users", newUser); // Lấy response từ backend
      setUsers([...users, response.data]); // Thêm user vào state ngay lập tức
      fetchUsers(); // Đồng bộ với backend
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  // Hàm xử lý khi nhấn nút "Xóa"
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      // Lọc bỏ user đã xóa ra khỏi state để cập nhật giao diện
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
      // Gửi request PUT để cập nhật lên backend
      const response = await axios.put(`http://localhost:3000/users/${updatedUser._id}`, updatedUser);

      // Cập nhật lại danh sách users trên giao diện
      setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));

      // Reset editingUser để form quay về chế độ "Thêm mới"
      setEditingUser(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  // Hàm xử lý khi hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản Lý User</h1>

        {/* --- KHỐI 1: FORM --- */}
        {/* Component này luôn hiển thị, nó sẽ tự thay đổi giao diện */}
        {/* và chức năng dựa vào prop 'editingUser' */}
        <div className="form-container">
          <AddUser
            onAdd={handleAddUser}
            editingUser={editingUser}
            onUpdate={handleUpdateUser}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* --- KHỐI 2: DANH SÁCH USER --- */}
        {/* Component này cũng luôn hiển thị và không bị ảnh hưởng */}
        <div className="user-list-container">
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        
      </header>
    </div>
  );
}

export default App;