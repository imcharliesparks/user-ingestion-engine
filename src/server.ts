import express from 'express'
import dotenv from 'dotenv'
import userDataIngestionRouter from './routers/userDataIngestionRouter'
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Health check!')
})

app.use('/ingest', userDataIngestionRouter)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
