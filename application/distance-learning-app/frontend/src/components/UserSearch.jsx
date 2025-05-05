import React, { useState } from 'react';

function UserSearch() {
  const [login, setLogin] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setUser(null);
    setError(null);
    fetch(`http://localhost:3001/api/users/login/${login}`)
      .then(res => {
        if (!res.ok) throw new Error('Користувача не знайдено');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Пошук користувача за логіном</h2>
      <input
        type="text"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Введіть логін"
      />
      <button onClick={handleSearch}>Знайти</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      {user && (
        <div style={{marginTop: '10px'}}>
          <b>ПІБ:</b> {user.full_name}<br />
          <b>Email:</b> {user.email}<br />
          <b>Роль:</b> {user.role}
        </div>
      )}
    </div>
  );
}

export default UserSearch;