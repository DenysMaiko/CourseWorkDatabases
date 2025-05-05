import React, { useEffect, useState } from 'react';

function StudentsGroupsDisciplinesList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users/groups-disciplines')
      .then(res => {
        if (!res.ok) throw new Error('Не вдалося отримати дані');
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Студенти, їх групи та дисципліни</h2>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <table>
        <thead>
          <tr>
            <th>Студент</th>
            <th>Група</th>
            <th>Дисципліна</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.student_name}</td>
              <td>{row.group_name}</td>
              <td>{row.discipline_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsGroupsDisciplinesList;