import express from 'express';
import { Request, Response, NextFunction} from 'express';
import { dbQuery } from './db';
import cors from 'cors';
require('dotenv').config()


const app = express();

// Added cors to enable frontend to reach backend in dev.
// In a real application this shouldn't be set to *
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 5000; // Hard coding this for the purpose of this exercise, this value should come from an environment variable


app.get('/', (_req, res) => {
    res.send({
        message: "Success!!!!!",
    })
});

app.get('/events', async (_req, res, next) => {
    try {
        const data = await dbQuery('SELECT * FROM EVENTS;');
        res.json({
            data
        });
    } catch (err: any) {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.send({
        error: err.message
    });
});
