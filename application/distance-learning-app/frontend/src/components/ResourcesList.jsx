import React, { useEffect, useState } from 'react';

function ResourcesList() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/resources')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setResources(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Ресурси</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {resources.map(r => (
          <li key={r.id}>
            {r.name} ({r.type}, {r.discipline})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesList;