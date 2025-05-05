import React, { useEffect, useState } from 'react';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users/students')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setStudents(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Студенти</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.full_name} ({s.email}), залікова книжка: {s.record_book_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsList;