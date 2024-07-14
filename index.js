//dependencies
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const mongoose=require('mongoose')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const url=process.env.DB_URL
const houseRouter=require('./src/routes/houseRouter')
const userRouter=require('./src/routes/userRouter')
 const port=process.env.PORT ||4000
const bodyParser=require('body-parser')
//middlewares

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/house',houseRouter)
app.use('/api/user',userRouter)


app.use(bodyParser.json())
mongoose.connect(url).then(()=>{
  console.log('database is running')
  app.listen(port,()=>{
    console.log('server is up and running')
  })
})

