import React, { useState } from 'react';

function DisciplineResourcesList() {
  const [discipline, setDiscipline] = useState('');
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setResources([]);
    setError(null);
    fetch(`http://localhost:3001/api/resources/by-discipline/${encodeURIComponent(discipline)}`)
      .then(res => {
        if (!res.ok) throw new Error('Ресурси не знайдено');
        return res.json();
      })
      .then(data => setResources(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Ресурси дисципліни</h2>
      <input
        type="text"
        value={discipline}
        onChange={e => setDiscipline(e.target.value)}
        placeholder="Введіть назву дисципліни"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {resources.map((r, idx) => (
          <li key={idx}>
            {r.name} ({r.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisciplineResourcesList;