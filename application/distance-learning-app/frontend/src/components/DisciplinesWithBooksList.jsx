import React, { useState } from 'react';

function DisciplinesWithBooksList() {
  const [type, setType] = useState('');
  const [disciplines, setDisciplines] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setDisciplines([]);
    setError(null);
    fetch(`http://localhost:3001/api/disciplines/with-resource-type/${encodeURIComponent(type)}`)
      .then(res => {
        if (!res.ok) throw new Error('Не знайдено дисциплін');
        return res.json();
      })
      .then(data => setDisciplines(data))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Дисципліни з ресурсами обраного типу</h2>
      <input
        type="text"
        value={type}
        onChange={e => setType(e.target.value)}
        placeholder="Введіть тип ресурсу (наприклад, Книга)"
      />
      <button onClick={handleSearch}>Пошук</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      <ul>
        {disciplines.map((d, idx) => (
          <li key={idx}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisciplinesWithBooksList;