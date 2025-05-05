import React, { useEffect, useState } from 'react';

function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/activities')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setActivities(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Активності</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {activities.map(a => (
          <li key={a.id}>
            {a.name} ({a.type}, {a.discipline})<br />
            {a.start_date} — {a.end_date}, Оцінювання: {a.evaluation_method}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivitiesList;