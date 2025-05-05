import React, { useState } from 'react';

function GroupPerformanceList() {
  const [groupName, setGroupName] = useState('');
  const [performance, setPerformance] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setPerformance([]);
    setError(null);
    fetch(`http://localhost:3001/api/groups/${encodeURIComponent(groupName)}/performance`)
      .then(res => {
        if (!res.ok) throw new Error('Даних не знайдено');
        return res.json();
      })
      .then(data => setPerformance(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Успішність студентів групи</h2>
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Введіть назву групи"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {performance.map((p, idx) => (
          <li key={idx}>
            <b>{p.full_name}</b> — {p.discipline}, {p.activity}: {p.score} балів
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupPerformanceList;