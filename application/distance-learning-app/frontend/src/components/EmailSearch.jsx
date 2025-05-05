import React, { useState } from 'react';

function EmailSearch() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setUser(null);
    setError(null);
    fetch(`http://localhost:3001/api/users/email/${encodeURIComponent(email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Користувача не знайдено');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Пошук користувача за email</h2>
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Введіть email"
      />
      <button onClick={handleSearch}>Знайти</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      {user && (
        <div style={{marginTop: '10px'}}>
          <b>ПІБ:</b> {user.full_name}<br />
          <b>Логін:</b> {user.login}<br />
          <b>Роль:</b> {user.role}
        </div>
      )}
    </div>
  );
}

export default EmailSearch;