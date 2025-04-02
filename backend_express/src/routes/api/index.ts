import express from 'express';
import eventsRouter from './events';
import housesRouter from './houses';
import path from 'path';

const router = express.Router();

router.use('/public/images', express.static(path.join(__dirname, '../../../public', 'images')));

router.use('/events', eventsRouter);
router.use('/houses', housesRouter);

export default router;
