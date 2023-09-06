
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import user_router from './routes/user.routes.js'
import auth_router from './routes/auth.routes.js'
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const app = express()

// connect to mangodb

const connectionString = 'mongodb+srv://serverdb:test1234@cluster0.ayhvpfp.mongodb.net/test2?retryWrites=true&w=majority';

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error: ' + err);
    }   
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/user', user_router);
app.use('/auth', auth_router);

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.listen(3000, (err) =>{
    if(err) (
        console.log(err)
    )
    console.info('server started')
})