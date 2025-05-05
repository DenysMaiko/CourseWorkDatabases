import React, { useState } from 'react';

function StudentDisciplineAverage() {
  const [userId, setUserId] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setAverage(null);
    setError(null);
    fetch(`http://localhost:3001/api/grades/average?userId=${userId}&discipline=${encodeURIComponent(discipline)}`)
      .then(res => {
        if (!res.ok) throw new Error('Даних не знайдено');
        return res.json();
      })
      .then(data => setAverage(data.average_score))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Середній бал студента з дисципліни</h2>
      <input
        type="number"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="user_id студента"
      />
      <input
        type="text"
        value={discipline}
        onChange={e => setDiscipline(e.target.value)}
        placeholder="Назва дисципліни"
      />
      <button onClick={handleSearch}>Обчислити</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      {average !== null && (
        <div style={{marginTop: '10px'}}>
          <b>Середній бал:</b> {average ? Number(average).toFixed(2) : 'Немає оцінок'}
        </div>
      )}
    </div>
  );
}

export default StudentDisciplineAverage;