import React, { useState } from 'react';

function ActivityGradesList() {
  const [activityName, setActivityName] = useState('');
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setGrades([]);
    setError(null);
    fetch(`http://localhost:3001/api/grades/by-activity/${encodeURIComponent(activityName)}`)
      .then(res => {
        if (!res.ok) throw new Error('Оцінки не знайдено');
        return res.json();
      })
      .then(data => setGrades(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Оцінки для активності</h2>
      <input
        type="text"
        value={activityName}
        onChange={e => setActivityName(e.target.value)}
        placeholder="Введіть назву активності"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {grades.map((g, idx) => (
          <li key={idx}>
            {g.full_name} (залікова: {g.record_book_number}) — {g.score} балів ({g.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityGradesList;