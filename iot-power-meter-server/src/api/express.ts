import express from 'express';
import measurementRoute from './route/measurement.route';
const app = express();
import cors from 'cors';

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/measurement', measurementRoute);

export default app;
