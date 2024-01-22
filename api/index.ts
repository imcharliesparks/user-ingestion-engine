import express from 'express'
import dotenv from 'dotenv'
import userDataIngestionRouter from '../src/routers/userDataIngestionRouter'
import { v4 } from 'uuid'
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/api', (req, res) => {
	const path = `/api/item/${v4()}`
	res.setHeader('Content-Type', 'text/html')
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

app.use('/ingest', userDataIngestionRouter)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
