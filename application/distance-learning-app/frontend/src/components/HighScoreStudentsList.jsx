import React, { useState } from 'react';

function HighScoreStudentsList() {
  const [activity, setActivity] = useState('');
  const [score, setScore] = useState(90);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setStudents([]);
    setError(null);
    fetch(`http://localhost:3001/api/grades/high-score?activity=${encodeURIComponent(activity)}&score=${score}`)
      .then(res => {
        if (!res.ok) throw new Error('Не знайдено студентів');
        return res.json();
      })
      .then(data => setStudents(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Студенти з балом вище {score} за активність</h2>
      <input
        type="text"
        value={activity}
        onChange={e => setActivity(e.target.value)}
        placeholder="Назва активності"
      />
      <input
        type="number"
        value={score}
        onChange={e => setScore(e.target.value)}
        min={0}
        max={100}
        style={{width: '80px', marginLeft: '10px'}}
      />
      <button onClick={handleSearch} style={{marginLeft: '10px'}}>Пошук</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {students.map((s, idx) => (
          <li key={idx}>
            {s.full_name}: {s.score} балів
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighScoreStudentsList;