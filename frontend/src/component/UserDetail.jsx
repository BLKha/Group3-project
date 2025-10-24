import React from 'react';
import '../styles/UserDetail.css';

const UserDetail = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="user-detail-overlay">
      <div className="user-detail-modal">
        <div className="user-detail-header">
          <h2>Thông Tin Chi Tiết</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        
        <div className="user-detail-content">
          <div className="detail-group">
            <label>Tên:</label>
            <div className="detail-value">{user.name}</div>
          </div>
          
          <div className="detail-group">
            <label>Email:</label>
            <div className="detail-value">{user.email}</div>
          </div>

          <div className="detail-group">
            <label>Vai trò:</label>
            <div className="detail-value">{user.role || 'Người dùng'}</div>
          </div>
          
          <div className="detail-group">
            <label>ID:</label>
            <div className="detail-value detail-id">{user._id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;