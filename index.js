const app = require("./app")
const http = require("http")
const {PORT} = require("./utils/config")
const lg = require("./utils/logger")

const server = http.createServer(app)

server.listen(PORT,() => {
    process.env.NODE_ENV === "test"
    ?console.log(`Test server running on port ${PORT}`)
    :lg.info(`Server running on port: ${PORT}`)
})

