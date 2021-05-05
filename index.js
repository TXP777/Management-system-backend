import dotenv from 'dotenv';
import express from 'express';
import './db';
import usersRouter from './api/users';
import employeesRouter from './api/employees';
import attendanceRouter from './api/attendance';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './authenticate';



dotenv.config();

const app = express();

const port = process.env.PORT;

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

if (process.env.SEED_DB) {
  
}

app.use(express.static('public'));
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// initialise passport​
app.use(passport.initialize());

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

app.use('/users', usersRouter);
app.use('/employee', employeesRouter);
app.use('/attendance', attendanceRouter);


app.use(errHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});