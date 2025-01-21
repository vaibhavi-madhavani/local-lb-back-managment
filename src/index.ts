
import express, { Express } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http'
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './docs/swagger-output.json';
dotenv.config()
const env = process.env.NODE_ENV || 'development'
let config = require('./config/config.json')[env];

global.config = config

import { db } from './models/index'
import HandleErrorMessage from './middleware/validatorMessage';
import userAuth from './middleware/auth';


db.sequelize.sync({ alter: false }).then(() => {
    console.log("re-sync db.");
}).catch((error: any) => {
    console.log("DB Error", error)
    throw new Error(error)
})

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

// Serve the generated Swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files from the uploads directory
app.use("/uploads", express.static(__dirname + "/uploads"));

/** Routes Configuration */
import authRoute from './routes/auth.route';
import labourRoute from './routes/labour.route';
import companyRoute from './routes/company.route';
import genericRoute from './routes/generic.route';

app.use('/auth', authRoute)
// Apply middleware for all routes after /auth
app.use(userAuth);
app.use('/labour', labourRoute)
app.use('/company', companyRoute)
app.use('/generic', genericRoute)



/** Handle error message */
app.use(HandleErrorMessage)

const server: any = http.createServer(app);

server.listen(4000, () => {
    // console.log(`Server is started on`, process.env.PORT)
    console.log(`Server is started on`, 4000)
})