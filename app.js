const express = require("express");
const app = express();
const port = 5555;
require('dotenv').config();


//db connection
const dbConnection = require("./db/dbConfig")

//user routes middleware file
const userRoutes = require("./routes/userRoute");

//question routes middleware file
const questionRoutes = require("./routes/questionRoute");
const {authMiddleware} = require("./Middleware/authMiddleware") 

//json middleware
app.use(express.json())

//user routes middleware
app.use("/api/users", userRoutes)


//question routes middleware...
app.use("/api/questions", authMiddleware, questionRoutes)

//answer routes middleware...

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ")
    await app.listen(port)
    console.log("database successfully connected")
    console.log(`listening on ${port}`)
  } catch (error) {
    console.log(error.message)
  }
}
start()