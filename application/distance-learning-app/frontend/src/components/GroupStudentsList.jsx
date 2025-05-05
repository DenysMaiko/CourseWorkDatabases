import React, { useState } from 'react';

function GroupStudentsList() {
  const [groupName, setGroupName] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setStudents([]);
    setError(null);
    fetch(`http://localhost:3001/api/groups/${encodeURIComponent(groupName)}/students`)
      .then(res => {
        if (!res.ok) throw new Error('Групу не знайдено або немає студентів');
        return res.json();
      })
      .then(data => setStudents(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Студенти групи</h2>
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Введіть назву групи"
      />
      <button onClick={handleSearch}>Показати</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {students.map((s, idx) => (
          <li key={idx}>
            {s.full_name}, залікова книжка: {s.record_book_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupStudentsList;