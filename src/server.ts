import express from 'express'
import dotenv from 'dotenv'
import userDataIngestionRouter from './routers/userDataIngestionRouter'
import cors from 'cors'
import { v4 } from 'uuid'
dotenv.config()

// TODO: Enable with our domains
// const corsOptions = {
// 	origin: 'https://example.com', // or a list of origins ['http://example1.com', 'http://example2.com']
// 	optionsSuccessStatus: 200, // For legacy browser support
// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// 	credentials: true // Enable credentials
// }

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(cors())

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
