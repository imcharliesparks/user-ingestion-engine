import { ClientPlatform } from './types'

export function parseUserAgent(userAgent: string): ClientPlatform {
	const osRegex = [
		{ name: 'Windows', regex: /Windows NT ([\d.]+)/ },
		{ name: 'macOS', regex: /Mac OS X ([\d_]+)/ },
		{ name: 'Android', regex: /Android ([\d.]+)/ },
		{ name: 'iOS', regex: /iPhone OS ([\d_]+)/ },
		{ name: 'Linux', regex: /Linux/ }
	]

	const browserRegex = [
		{ name: 'Chrome', regex: /Chrome\/([\d.]+)/ },
		{ name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
		{ name: 'Safari', regex: /Safari\/([\d.]+)/ },
		{ name: 'Edge', regex: /Edge\/([\d.]+)/ },
		{ name: 'IE', regex: /Trident\/.*rv:([\d.]+)/ }
	]

	const detectOS = (ua: string) => {
		for (const os of osRegex) {
			const match = ua.match(os.regex)
			if (match) {
				const version = match[1].replace(/_/g, '.') // Replace _ with . in versions
				return { os: os.name, version }
			}
		}
		return { os: 'Unknown', version: 'Unknown' }
	}

	const detectBrowser = (ua: string) => {
		for (const browser of browserRegex) {
			const match = ua.match(browser.regex)
			if (match) {
				return { browser: browser.name, version: match[1] }
			}
		}
		return { browser: 'Unknown', version: 'Unknown' }
	}

	const osInfo = detectOS(userAgent)
	const browserInfo = detectBrowser(userAgent)

	return {
		osName: osInfo.os,
		osVersion: osInfo.version,
		browser: browserInfo.browser
	}
}
