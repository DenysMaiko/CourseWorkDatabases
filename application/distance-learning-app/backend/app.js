const express = require('express');
const cors = require('cors');

const disciplinesRouter = require('./routes/disciplines');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const activitiesRouter = require('./routes/activities');
const resourcesRouter = require('./routes/resources');
const gradesRouter = require('./routes/grades');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/disciplines', disciplinesRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/grades', gradesRouter);

// TODO: add routes here

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});