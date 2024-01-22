import { Request, Response, NextFunction } from 'express'
import firebase_app from '../lib/firebase'
import { getFirestore, collection } from 'firebase/firestore'
import { CollectionNames, CustomUserDataRequest } from '../shared/types'

// TODO: Consider modifying to support multiple types of collections instead of just users
const setupFirebaseMiddleware = (req: CustomUserDataRequest, res: Response, next: NextFunction) => {
	try {
		const db = getFirestore(firebase_app)
		const userDataCollectionRef = collection(db, CollectionNames.USER_DATA)
		req.collectionData = userDataCollectionRef
		next()
	} catch (e) {
		res.status(404).json({ error: 'There was an error establishing the firebase connection', e })
	}
}

export default setupFirebaseMiddleware
