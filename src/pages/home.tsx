import { createSignal } from 'solid-js'
import { Calendar } from '../components/calendar/Calendar'
import { mapDataToProgressRows } from '../data/utils'
import { calendar1 } from '../data/calendar1'

const defaultNumWeeks = 4 * 2 // Two months

export default function Home() {

	const [numWeeks] = createSignal(defaultNumWeeks)

	const progressRows = () => {
		const numDays = numWeeks() * 7

		const fromDate = new Date()
		fromDate.setDate(fromDate.getDate() - numDays)
		
		return mapDataToProgressRows(calendar1, fromDate, numDays)
	}

	return (
		<section class=" p-8">

			<Calendar
				progressRows={progressRows()}
			/>

		</section>
	)
}
