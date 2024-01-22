// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
// TODO: Use with `isSupported` to check if analytics is supported if the client wants it
// getAnalytics(firebase_app)

export default firebase_app
