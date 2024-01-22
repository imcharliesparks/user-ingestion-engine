import { Request, Response } from 'express'
import { DocumentData, QueryDocumentSnapshot, getDocs, addDoc } from 'firebase/firestore'
import {
	APIStatuses,
	AnalyticsPersonData,
	CollectionNames,
	CustomUserDataRequest,
	DocumentResponses
} from '../shared/types'
import { parseUserAgent } from '../shared/utils'

// TODO: Add joi validation checks
export const getUser = (req: Request, res: Response) => {
	res.send('Get a user')
}

export const createUser = async (req: CustomUserDataRequest, res: Response) => {
	const payload: AnalyticsPersonData = {
		clientPlatform: parseUserAgent(req.body.userAgent!),
		clientReferrer: req.body.referrer,
		ipAddress: req.body.ip,
		applicationSource: req.body.applicationSource,
		typeOfPerson: req.body.typeOfPerson,
		personalInfo: req.body.personalInfo
	}

	const documentRef = await addDoc(req.collectionData!, payload)

	if (documentRef.id) {
		res.status(201).json({
			status: APIStatuses.SUCCESS,
			type: DocumentResponses.DATA_CREATED,
			data: { user_data: { id: documentRef.id, ...payload } }
		})
	} else {
		console.error('e', DocumentResponses.DATA_NOT_CREATED)
		res.status(400).json({
			status: APIStatuses.ERROR,
			type: DocumentResponses.DATA_NOT_CREATED,
			data: { error: 'Could not create new user data entry.' }
		})
	}
}

export const updateUser = (req: Request, res: Response) => {
	res.send('Update a user')
}

export const deleteUser = (req: Request, res: Response) => {
	res.send('Delete a user')
}

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
