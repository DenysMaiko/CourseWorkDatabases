import React, { useEffect, useState } from 'react';

function GroupStudentCount() {
  const [counts, setCounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/groups/student-count')
      .then(res => {
        if (!res.ok) throw new Error('Не вдалося отримати дані');
        return res.json();
      })
      .then(data => setCounts(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Кількість студентів у групах</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {counts.map((g, idx) => (
          <li key={idx}>
            {g.name}: {g.student_count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupStudentCount;