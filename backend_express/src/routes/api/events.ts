import express from 'express';
import { dbQuery } from '../../db/db';

const router = express.Router();

// Routes with prefix /events

router.get('/', async (_req, res, next) => {
    try {
        const data = await dbQuery('SELECT * FROM EVENTS;');
        res.json({
            data
        });
    } catch (err: any) {
        next(err);
    }
});

export default router;
