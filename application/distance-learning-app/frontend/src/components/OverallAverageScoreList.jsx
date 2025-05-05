import React, { useEffect, useState } from 'react';

function OverallAverageScoreList() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users/overall-average-score')
      .then(res => {
        if (!res.ok) throw new Error('Не вдалося отримати дані');
        return res.json();
      })
      .then(data => setScores(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Середній бал кожного студента</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {scores.map((s, idx) => (
          <li key={idx}>
            {s.full_name}: {Number(s.overall_average_score).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OverallAverageScoreList;