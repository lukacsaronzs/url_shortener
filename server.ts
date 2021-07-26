import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import config from 'config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import error from './middleware/error';
import headers from './middleware/headers';
import ConnectDB  from './db-connection';
import router from './routes';

ConnectDB();

// setup dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

// express app setup
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 3rd party middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// headers middleware
app.use(headers);

// routers middleware
app.use('/', router);

// error middleware
app.use(error);

// server setup
const server = http.createServer(app);
const port: number | string = process.env.PORT || config.get('server.port');
server.listen(port, () => {
    console.log('Node server started on %s port %s ...', new Date(), port);
});
