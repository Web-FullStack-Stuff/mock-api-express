import "./util/loadEnvironment.js"
import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
var app = express()

// parse application/json
app.use(express.json());
app.use(morgan('short'))
app.use(cors())

import postsRoute from "./routes/posts.js"
import testRoute from "./routes/test.js"

app.use('/api/test', testRoute)
app.use('/api/posts', postsRoute)

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Local API listening on port ${PORT}`)
})