import { Router } from 'express'
const userDataIngestionRouter = Router()

import { getUser, createUser, updateUser, deleteUser } from '../controllers/userDataIngestionController'

userDataIngestionRouter.get('/', getUser)
userDataIngestionRouter.post('/', createUser)
userDataIngestionRouter.put('/:id', updateUser)
userDataIngestionRouter.delete('/:id', deleteUser)

export default userDataIngestionRouter
