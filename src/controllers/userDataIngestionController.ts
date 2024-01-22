import { Request, Response } from 'express'
import {
	DocumentData,
	QueryDocumentSnapshot,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	getDoc,
	deleteDoc
} from 'firebase/firestore'
import {
	APIStatuses,
	AnalyticsPersonData,
	CustomUserDataRequest,
	DocumentResponses,
	GeneralAPIResponses
} from '../shared/types'
import { parseUserAgent } from '../shared/utils'

// TODO: Add joi validation checks
export const getUser = async (req: CustomUserDataRequest, res: Response) => {
	const id = req.params.id as string

	try {
		const documentRef = doc(req.collectionData!, id)
		const currentUserDoc = await getDoc(documentRef)
		const curentUserData = currentUserDoc.data()

		return res.status(200).json({
			status: APIStatuses.SUCCESS,
			type: DocumentResponses.DATA_UPDATED,
			data: { user_data: curentUserData }
		})
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export const getAllUsers = async (req: CustomUserDataRequest, res: Response) => {
	try {
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
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export const createUser = async (req: CustomUserDataRequest, res: Response) => {
	try {
		const payload: Omit<AnalyticsPersonData, 'personalInfo'> = {
			clientPlatform: parseUserAgent(req.body.userAgent!),
			clientReferrer: req.body.referrer,
			ipAddress: req.body.ip,
			applicationSource: req.body.applicationSource,
			typeOfPerson: req.body.typeOfPersonf
		}

		const documentRef = await addDoc(req.collectionData!, payload)

		if (documentRef.id) {
			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED,
				data: { user_id: documentRef.id }
			})
		} else {
			console.error('e', DocumentResponses.DATA_NOT_CREATED)
			res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_CREATED,
				data: { error: 'Could not create new user data entry.' }
			})
		}
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export const updateUser = async (req: CustomUserDataRequest, res: Response) => {
	const id = req.params.id as string
	const { newUserRole, personalInfo } = req.body

	try {
		const documentRef = doc(req.collectionData!, id)
		const currentUserDoc = await getDoc(documentRef)
		const curentUserData = currentUserDoc.data() as Omit<AnalyticsPersonData, 'personalInfo'>

		const updatedUserData: AnalyticsPersonData = {
			...curentUserData,
			personalInfo,
			typeOfPerson: newUserRole
		}

		await updateDoc(documentRef, updatedUserData)

		return res.status(200).json({
			status: APIStatuses.SUCCESS,
			type: DocumentResponses.DATA_UPDATED,
			data: { updated_user_data: updatedUserData }
		})
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export const deleteUser = async (req: CustomUserDataRequest, res: Response) => {
	const id = req.params.id as string

	try {
		const documentRef = doc(req.collectionData!, id)
		await deleteDoc(documentRef)

		return res.status(200).json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_DELETED })
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}
