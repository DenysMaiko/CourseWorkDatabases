import React, { useState } from 'react';

function ActivitiesByDateList() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setActivities([]);
    setError(null);
    fetch(`http://localhost:3001/api/activities/by-date?start=${start}&end=${end}`)
      .then(res => {
        if (!res.ok) throw new Error('Не знайдено активностей у цьому діапазоні');
        return res.json();
      })
      .then(data => setActivities(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Активності у діапазоні дат</h2>
      <input
        type="date"
        value={start}
        onChange={e => setStart(e.target.value)}
        placeholder="Початкова дата"
      />
      <input
        type="date"
        value={end}
        onChange={e => setEnd(e.target.value)}
        placeholder="Кінцева дата"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {activities.map((a, idx) => (
          <li key={idx}>
            {a.name} ({a.discipline_name}): {a.start_date} — {a.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivitiesByDateList;