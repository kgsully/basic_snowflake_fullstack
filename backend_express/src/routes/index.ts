import express from 'express';
import apiRouter from './api';

export const router = express.Router();

// Add routes with prefix /api
router.use('/api', apiRouter);

// Routes with prefix /

router.get('/', (_req, res) => {
    res.send({
        message: "Success!",
    })
});

export default router
