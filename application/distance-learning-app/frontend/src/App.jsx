import React from 'react';
import './App.css';

import DisciplinesList from './components/DisciplinesList';
import UsersList from './components/UsersList';
import GroupsList from './components/GroupsList';
import ActivitiesList from './components/ActivitiesList';
import ResourcesList from './components/ResourcesList';
import GradesList from './components/GradesList';
import StudentsList from './components/StudentsList';
import LecturersList from './components/LecturersList';
import UserSearch from './components/UserSearch';
import EmailSearch from './components/EmailSearch';
import GroupStudentsList from './components/GroupStudentsList';
import StudentGroupsSearch from './components/StudentGroupsSearch';
import GroupStudentCount from './components/GroupStudentCount';
import DisciplineActivitiesList from './components/DisciplineActivitiesList';
import ActivitiesByDateList from './components/ActivitiesByDateList';
import GroupDisciplineSearch from './components/GroupDisciplineSearch';
import StudentGradesList from './components/StudentGradesList';
import ActivityGradesList from './components/ActivityGradesList';
import StudentDisciplineAverage from './components/StudentDisciplineAverage';
import HighScoreStudentsList from './components/HighScoreStudentsList';
import GroupPerformanceList from './components/GroupPerformanceList';
import DisciplineResourcesList from './components/DisciplineResourcesList';
import DisciplinesWithBooksList from './components/DisciplinesWithBooksList';
import StudentsGroupsDisciplinesList from './components/StudentsGroupsDisciplinesList';
import OverallAverageScoreList from './components/OverallAverageScoreList';

function App() {
  return (
    <div className="container">
      <h1>Система дистанційного навчання</h1>
      <p>Вітаємо у вашій системі дистанційного навчання!</p>
      <UserSearch />
      <EmailSearch />
      <GroupStudentsList />
      <StudentGroupsSearch />
      <GroupStudentCount />
      <DisciplineActivitiesList />
      <ActivitiesByDateList />
      <GroupDisciplineSearch />
      <StudentGradesList />
      <ActivityGradesList />
      <StudentDisciplineAverage />
      <HighScoreStudentsList />
      <GroupPerformanceList />
      <DisciplineResourcesList />
      <DisciplinesWithBooksList />
      <StudentsGroupsDisciplinesList />
      <OverallAverageScoreList />
      <DisciplinesList />
      <UsersList />
      <StudentsList />
      <LecturersList />
      <GroupsList />
      <ActivitiesList />
      <ResourcesList />
      <GradesList />
    </div>
  );
}

export default App;