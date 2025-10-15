import React, { useState } from 'react';

const AddUser = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Vui lòng nhập đủ tên và email");
      return;
    }
    onAdd({ name, email }); // Gửi dữ liệu lên App.js
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Thêm User Mới</h2>
      <div className="form-group">
        <label>Tên:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit">Thêm User</button>
    </form>
  );
};

export default AddUser;