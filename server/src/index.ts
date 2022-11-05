import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import api from './api';
import * as mw from './middleware';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(morgan('common'));

app.all(/(\/api\/[^(auth)].*)/, mw.authenticate);
app.post('/api/auth/login', api.auth.login.post);
app.post('/api/auth/register', api.auth.register.post);
app.get('/api/auth/logout', api.auth.logout.get);
app.get('/api/auth/refresh', api.auth.refresh.get);
app.get('/api/self', api.self.get);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
