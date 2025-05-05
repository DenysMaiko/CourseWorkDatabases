import React, { useEffect, useState } from 'react';

function GroupsList() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/groups')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setGroups(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Групи</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {groups.map(g => (
          <li key={g.id}>
            {g.name} (Дисципліна: {g.discipline})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;