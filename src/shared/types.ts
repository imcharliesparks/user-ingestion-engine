import { Request } from 'express'
import { CollectionReference, DocumentData } from 'firebase/firestore'

// General Request Enums
export enum APIStatuses {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	FAILURE = 'FAILURE'
}

export enum APIMethods {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export enum GeneralAPIResponses {
	FAILURE = 'FAILURE',
	INVALID_REQUEST_TYPE = 'INVALID_REQUEST_TYPE',
	UNAUTHORIZED = 'UNAUTHORIZED',
	NOT_FOUND = 'NOT_FOUND'
}

export enum ApplicationSource {
	MONICA_WALLS_COMEDY = 'Monica Walls Comedy',
	SFS_WEBSITE = 'SFS Website',
	PLUSFRAMES_WEB = 'Plusframes Web'
}

export enum TypeOfPerson {
	ADMIN = 'ADMIN',
	VISITOR = 'VISITOR',
	PROMOTER = 'PROMOTER',
	REGISTERED_VISITOR = 'REGISTERED_VISITOR'
}
export type ClientPlatform = {
	osName: string
	osVersion: string
	browser: string
}

export type AnalyticsPersonData = {
	personalInfo: Person
	typeOfPerson: TypeOfPerson
	clientPlatform: ClientPlatform
	clientReferrer: string
	ipAddress: string
	applicationSource: ApplicationSource
}

export type Person = {
	firstName: string
	lastName: string
	email: string
	phoneNumber: number
}

export interface TypedRequest<T> extends Request {
	body: T
}

// Firebase Specific Enums
export enum DocumentResponses {
	DATA_FOUND = 'DATA_FOUND',
	DATA_NOT_FOUND = 'DATA_NOT_FOUND',
	DATA_DELETED = 'DATA_DELETED',
	DATA_UPDATED = 'DATA_UPDATED',
	DATA_CREATED = 'DATA_CREATED',
	DATA_NOT_CREATED = 'DATA_NOT_CREATED'
}

export enum CollectionNames {
	USER_DATA = 'user-data'
}

export interface CustomUserDataRequest extends Request {
	collectionData?: CollectionReference<DocumentData, DocumentData>
}
