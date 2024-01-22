import { Request, Response } from 'express'

export const getUser = (req: Request, res: Response) => {
	// Implement your logic here
	res.send('Get a user')
}

export const createUser = (req: Request, res: Response) => {
	// Implement your logic here
	res.send('Create a user')
}

export const updateUser = (req: Request, res: Response) => {
	// Implement your logic here
	res.send('Update a user')
}

export const deleteUser = (req: Request, res: Response) => {
	// Implement your logic here
	res.send('Delete a user')
}
