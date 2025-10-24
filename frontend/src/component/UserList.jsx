import React, { useState } from 'react';
import '../styles/UserList.css';
import UserDetail from './UserDetail';

const UserList = ({ users , onEdit, onDelete}) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="user-list-container">
      <h2>Danh Sách User</h2>
      {users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <ul className="user-list">
          {users.map((user, index) => (
            <li 
              key={user._id || index}
              onClick={() => setSelectedUser(user)}
              className="user-item"
            >
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <div className="user-actions" onClick={e => e.stopPropagation()}>
                <button className="btn-edit" onClick={() => onEdit(user)}>Sửa</button>
                <button className="btn-delete" onClick={() => onDelete(user._id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {selectedUser && (
        <UserDetail 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserList;