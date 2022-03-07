const {DB_URL}=require("./utils/config"),
    express = require("express"),
    app = express(),
    apiRoutes = require("./routes/api/apiRoutes"),
    testingRouter = require("./routes/testing/testRoutes"),
    middleware = require("./utils/middleware"),
    mongoose = require("mongoose")
    lg = require("./utils/logger")

mongoose.connect(DB_URL).then(()=>lg.info("Connected to MongoDB"))
        .catch(err=>lg.err("Error connecting to MongoDB: ",err.message))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api",apiRoutes)

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app