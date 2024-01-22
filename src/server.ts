import express from 'express'
import dotenv from 'dotenv'
import userDataIngestionRouter from './routers/userDataIngestionRouter'
dotenv.config()

// Initialize Firebase Admin
// const serviceAccount = require('../path/to/your/firebase-service-account.json')

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount)
// })

// const db = admin.firestore()

// Initialize Express
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
