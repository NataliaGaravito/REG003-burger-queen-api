import express = require('express');
import BaseRouter from './routes/index';

const app = express()
const router = express.Router();
app.use(express.json())

router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

app.use('/api', BaseRouter);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});


// ... your REST API routes will go here

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)