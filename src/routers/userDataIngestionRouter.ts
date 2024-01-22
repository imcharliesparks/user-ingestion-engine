import { Router } from 'express'
const userDataIngestionRouter = Router()

import { getUser, createUser, updateUser, deleteUser, getAllUsers } from '../controllers/userDataIngestionController'
import setupFirebaseMiddleware from '../middleware/setupFirebase'

userDataIngestionRouter.use(setupFirebaseMiddleware)

userDataIngestionRouter.get('/', getAllUsers)
userDataIngestionRouter.get('/:id', getUser)
userDataIngestionRouter.post('/', createUser)
userDataIngestionRouter.put('/:id', updateUser)
userDataIngestionRouter.delete('/:id', deleteUser)

export default userDataIngestionRouter
