import React, { useEffect, useState } from 'react';

function GradesList() {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/grades')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setGrades(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Оцінки</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {grades.map(g => (
          <li key={g.id}>
            {g.student}: {g.activity} — {g.score} балів ({g.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GradesList;