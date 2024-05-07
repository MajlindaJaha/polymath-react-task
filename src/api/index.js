import axios from 'axios'
import { getAuthedUser } from '../helpers/auth'

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

instance.interceptors.request.use(
	(config) => {
		const token = getAuthedUser()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

export const setAuthorizationHeader = (accessToken) => {
	if (accessToken) {
		instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
	}
}

export default instance
