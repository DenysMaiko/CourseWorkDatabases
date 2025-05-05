import React, { useEffect, useState } from 'react';

function DisciplinesList() {
  const [disciplines, setDisciplines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/disciplines')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setDisciplines(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Дисципліни</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {disciplines.map(d => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisciplinesList;