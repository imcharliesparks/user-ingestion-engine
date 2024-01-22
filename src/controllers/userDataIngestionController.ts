import { Request, Response } from 'express'
import firebase_app from '../lib/firebase'
import { FirebaseApp } from 'firebase/app'
import { getFirestore, collection, DocumentData, QueryDocumentSnapshot, getDocs } from 'firebase/firestore'
import { APIStatuses, CollectionNames, CustomUserDataRequest, DocumentResponses } from '../shared/types'

export const getAllUsers = async (req: CustomUserDataRequest, res: Response) => {
	const userDataQuerySnapshot = await getDocs(req.collectionData!)
	const foundUserData = userDataQuerySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
		id: doc.id,
		...doc.data()
	}))
	if (foundUserData.length) {
		return res.status(200).json({
			status: APIStatuses.SUCCESS,
			type: DocumentResponses.DATA_FOUND,
			data: { user_data: foundUserData }
		})
	} else {
		console.error('e', DocumentResponses.DATA_NOT_FOUND)
		return res.status(400).json({ status: APIStatuses.ERROR, type: DocumentResponses.DATA_NOT_FOUND })
	}
}

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
