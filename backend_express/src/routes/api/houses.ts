import express from 'express';
import { dbQuery } from '../../db/db';

const router = express.Router();

// Routes with prefix /houses

router.use('/:houseName', async (req, res, next) => {
    const { houseName } = req.params;
    const sqlText = `SELECT * FROM HOUSE2 WHERE HOUSENAME = '${houseName.toUpperCase()}';`;
    try {
        const data = await dbQuery(sqlText);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.use('/', async (_req, res, next) => {
    const sqlText = 'SELECT * FROM HOUSE2;';
    try {
        const data = await dbQuery(sqlText);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

export default router;
