import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = ({ token, currentUser }) => {
  const [user, setUser] = useState(currentUser || null);
  const [name, setName] = useState((currentUser && currentUser.name) || '');
  const [email, setEmail] = useState((currentUser && currentUser.email) || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setName(response.data.name || '');
        setEmail(response.data.email || '');
      } catch (error) {
        setMessage('Lỗi tải thông tin');
      }
    };
    // Nếu không có currentUser prop, fetch từ server
    if (token && !currentUser) fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const payload = { name, email };
      if (password) payload.password = password;
      const response = await axios.put(
        'http://localhost:3001/profile',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Cập nhật thành công');
      setPassword('');
    } catch (error) {
      setMessage('Lỗi cập nhật');
    }
  };

  if (!token) return <p className="profile-message">Vui lòng đăng nhập</p>;

  return (
    <div className="profile-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="profile-box" style={{ width: 420, padding: 24, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', background: '#fff' }}>
        <h2 className="profile-title" style={{ textAlign: 'center', marginBottom: 10 }}>Thông Tin Cá Nhân</h2>
        {user ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="input-group" style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }}
              />
            </div>
            <div className="input-group" style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }}
              />
            </div>
            <div className="input-group" style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Mật khẩu mới (tùy chọn)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Để trống nếu không đổi"
                className="profile-input"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="submit" className="btn primary" style={{ padding: '10px 18px', borderRadius: 6 }}>Cập Nhật</button>
            </div>
            {message && <p className="profile-message" style={{ marginTop: 12 }}>{message}</p>}
          </form>
        ) : (
          <p className="profile-message">Đang tải...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;