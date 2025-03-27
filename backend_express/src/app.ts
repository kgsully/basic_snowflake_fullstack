import express from 'express';
import { Request, Response, NextFunction} from 'express';
import { dbConfig } from './db/db';
import cors from 'cors';
require('dotenv').config()
import routes from './routes';


const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database configuration
dbConfig();

// Added cors to enable frontend to reach backend in dev.
// In a real application this shouldn't be set to *
app.use(cors({
    origin: '*'
}));

// Add routes
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.send({
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
