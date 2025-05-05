import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Користувачі</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.full_name} ({u.role}) — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;