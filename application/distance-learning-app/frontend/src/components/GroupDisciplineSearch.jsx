import React, { useState } from 'react';

function GroupDisciplineSearch() {
  const [groupName, setGroupName] = useState('');
  const [discipline, setDiscipline] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setDiscipline(null);
    setError(null);
    fetch(`http://localhost:3001/api/groups/${encodeURIComponent(groupName)}/discipline`)
      .then(res => {
        if (!res.ok) throw new Error('Дисципліну не знайдено');
        return res.json();
      })
      .then(data => setDiscipline(data.name))
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Знайти дисципліну групи</h2>
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Введіть назву групи"
      />
      <button onClick={handleSearch}>Пошук</button>
      {error && <div style={{color: 'red'}}>Помилка: {error}</div>}
      {discipline && (
        <div style={{marginTop: '10px'}}>
          <b>Дисципліна:</b> {discipline}
        </div>
      )}
    </div>
  );
}

export default GroupDisciplineSearch;