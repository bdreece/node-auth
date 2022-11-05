import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import z from 'zod';
import {PrismaClient} from '@prisma/client';

const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || 8080;
const app = express();
const db = new PrismaClient();

app.use(express.json());
app.use(compression());
app.use(morgan('common'));

app.post('/auth/register', async (req, res) => {

});

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
