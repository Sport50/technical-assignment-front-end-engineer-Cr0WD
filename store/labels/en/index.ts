import global from './global'
import errors from './errors'

export default {
	global,
	errors,
	appbar: {
		signIn: 'Sign-in',
		clickToLogin: 'Please, click here to login',
		clickToLogout: 'Please, click here to logout',
	},
	pages: {
		news: {
			title: 'Latest news',
			add: 'Add news',
			form: {
				updated: 'News was updated successful',
				created: 'News was created successful',
				save: 'Save',
				create: 'Create new news article',
				title: {
					label: 'Title',
				},
				details: {
					label: 'Details',
				},
			},
		},
	},
}
