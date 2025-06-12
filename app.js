const express = require('express');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const subjectRoutes = require('./routes/subjectRoutes');
app.use('/api/subject', subjectRoutes);

const markRoutes = require('./routes/markRoutes');
app.use('/api/marks', markRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
