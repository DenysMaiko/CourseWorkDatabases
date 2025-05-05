import React, { useEffect, useState } from 'react';

function LecturersList() {
  const [lecturers, setLecturers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users/lecturers')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setLecturers(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Викладачі</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {lecturers.map(l => (
          <li key={l.id}>
            {l.full_name} ({l.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LecturersList;