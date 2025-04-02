import express from 'express';
import { dbQuery } from '../../db/db';
import { validateEvent } from '../../util/validation';
import coreJoi from 'joi';
import joiDate from '@joi/date'
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const router = express.Router();

// Routes with prefix /events

router.get('/:houseName', async (req, res, next) => {
    const { houseName } = req.params;
    const sqlText = `SELECT * FROM EVENTS2 WHERE HOUSENAME = '${houseName.toUpperCase()}'`;
    try {
        const data = await dbQuery(sqlText);
        res.send(data);
    } catch (err: any) {
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    const { familySelect, searchInput } = req.query;

    let sqlText = 'SELECT * FROM EVENTS2';

    if ((familySelect && familySelect !== 'All') || searchInput) {
        sqlText += ' WHERE';
        sqlText += familySelect && familySelect !== 'All' ? ` FAMILY iLike '${familySelect}'` : ''
        sqlText += (familySelect && familySelect !== 'All') && searchInput ? ' AND' : '';
        sqlText += searchInput ? ` EVENTNAME iLike '${searchInput}'` : '';
        sqlText += ';'
    }

    try {
        const data = await dbQuery(sqlText);
        res.send(data);
    } catch (err: any) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const newRecord = req.body;

    const validation = validateEvent(newRecord);
    if(validation.error) {
        const errorArray: string[] = [];
        for(let item of validation.error.details) {
            errorArray.push(item.message);
        }
        res.json({message: 'validation error(s)', error: errorArray});
    } else {
        let sqlText = "INSERT INTO EVENTS2 (HOUSENAME, EVENTNAME,"
        sqlText += newRecord.DATE ? ' DATE,' : '';
        sqlText += ' FAMILY)'
        sqlText += ` VALUES('${newRecord.HOUSENAME.toUpperCase()}', '${newRecord.EVENTNAME}',`;
        sqlText += newRecord.DATE ? ` '${newRecord.DATE}',` : '';
        sqlText += ` '${newRecord.FAMILY}');`;

        try {
            const data = await dbQuery(sqlText);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }
});

export default router;
