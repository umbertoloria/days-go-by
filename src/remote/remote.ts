import { TCalendar, calendar1, calendar2, calendar3 } from '../data/example-calendars'

export const readCalendar = (id: number): Promise<TCalendar> => {
	// Fakes a connection.
	return new Promise<TCalendar>((resolve, reject) => {
		setTimeout(() => {
			if (id === 1) {
				return resolve(calendar1)
			}
			if (id === 2) {
				return resolve(calendar2)
			}
			if (id === 3) {
				return resolve(calendar3)
			}
			return reject(new Error('Calendar not found'))
		}, 500)
	})
}
