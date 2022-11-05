import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import api from './api';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(compression());
app.use(morgan('common'));

app.post('/api/login', api.login.post);
app.post('/api/register', api.register.post);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
