import React from 'react';

const UserList = ({ users , onEdit, onDelete}) => {
  return (
    <div className="user-list-container">
      <h2>Danh Sách User</h2>
      {users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={user._id || index}>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <div className="user-actions">
                <button className="btn-edit" onClick={() => onEdit(user)}>Sửa</button>
                <button className="btn-delete" onClick={() => onDelete(user._id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;