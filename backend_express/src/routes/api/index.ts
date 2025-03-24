import express from 'express';
import eventsRouter from './events';
import housesRouter from './houses';

const router = express.Router();

router.use('/events', eventsRouter);
router.use('/houses', housesRouter);

export default router;
