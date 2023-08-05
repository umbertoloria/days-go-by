import { createSignal } from 'solid-js'
import { calendar1 } from '../data/calendar1'
import { Calendar } from '../components/calendar/Calendar'

const defaultNumWeeks = 4 * 2 // Two months

export default function Home() {

	const [numWeeks] = createSignal(defaultNumWeeks)

	const fromDate = () => {
		const numDays = numWeeks() * 7

		const fromDate = new Date()
		fromDate.setDate(fromDate.getDate() - numDays)
		
		return fromDate
	}

	return (
		<section class=" p-8">

			<Calendar
				startWeekFromDate={fromDate()}
				numWeeks={numWeeks()}
				datesInfo={calendar1}
			/>

		</section>
	)
}
