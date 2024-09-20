import express from 'express'
import bodyParser from 'body-parser'
import mainRoutes from './router/main'
import authRoutes from './router/auth'
const app = express()
import {connectToDB} from './util/database'
const main = async () => {
 try {
   await connectToDB();
   console.log("seccussful connected to posterizer database");
 } catch (err) {
   console.log("connecting failed");
 }
};
main()

app.use(bodyParser.json())

app.use('/',mainRoutes)
app.use('/auth',authRoutes)

app.listen(5800)