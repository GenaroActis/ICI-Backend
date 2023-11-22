import express from 'express';
import { PORT } from './config.js';
import apiRouter from './routes/apiRouter.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import { errorHandler } from './middlewares/errorHandler.js';
import session from 'express-session'
import './passport/jwt.js';
import './db/db.js';
const app = express();
app.use(helmet());
app.use(cors(`Access-Control-Allow-Origin: *`));

app.use('/src/public', express.static('src/public'))
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(morgan('dev'));

app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 50000
    },
    // store : new MongoStore({
    //     mongoUrl: MongoDBUrl,
    //     ttl: 500,
    // })
})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandler)
app.use('/api', apiRouter);

const httpServer = app.listen(PORT, ()=>{
    console.log('server ok en port', PORT);
});

export default app;