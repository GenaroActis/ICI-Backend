import express from 'express';
import { PORT } from './config.js'
import './db/db.js'
import apiRouter from './routes/apiRouter.js'
const app = express();
app.use(express.json());

app.use('/api', apiRouter)

const httpServer = app.listen(PORT, ()=>{
    console.log('server ok en port', PORT);
});