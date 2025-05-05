import React, { useState } from 'react';

function DisciplineActivitiesList() {
  const [discipline, setDiscipline] = useState('');
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setActivities([]);
    setError(null);
    fetch(`http://localhost:3001/api/activities/by-discipline/${encodeURIComponent(discipline)}`)
      .then(res => {
        if (!res.ok) throw new Error('Дисципліну не знайдено або немає активностей');
        return res.json();
      })
      .then(data => setActivities(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Активності дисципліни</h2>
      <input
        type="text"
        value={discipline}
        onChange={e => setDiscipline(e.target.value)}
        placeholder="Введіть назву дисципліни"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {activities.map((a, idx) => (
          <li key={idx}>
            {a.name} ({a.type})<br />
            {a.start_date} — {a.end_date}, Оцінювання: {a.evaluation_method}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisciplineActivitiesList;