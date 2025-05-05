import React, { useState } from 'react';

function StudentGroupsSearch() {
  const [userId, setUserId] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setGroups([]);
    setError(null);
    fetch(`http://localhost:3001/api/groups/by-student/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Студента не знайдено або він не у групах');
        return res.json();
      })
      .then(data => setGroups(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Групи студента</h2>
      <input
        type="number"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="Введіть user_id студента"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {groups.map((g, idx) => (
          <li key={idx}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentGroupsSearch;