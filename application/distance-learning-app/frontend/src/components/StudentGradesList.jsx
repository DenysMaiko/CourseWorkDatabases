import React, { useState } from 'react';

function StudentGradesList() {
  const [userId, setUserId] = useState('');
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setGrades([]);
    setError(null);
    fetch(`http://localhost:3001/api/grades/by-student/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Оцінки не знайдено');
        return res.json();
      })
      .then(data => setGrades(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Оцінки студента</h2>
      <input
        type="number"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="Введіть user_id студента"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {grades.map((g, idx) => (
          <li key={idx}>
            <b>{g.discipline_name}</b> — {g.activity_name} ({g.type}): {g.score} балів ({g.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentGradesList;