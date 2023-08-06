import { createSignal } from 'solid-js'
import { calendar1 } from '../data/calendar1'
import { Calendar } from '../components/calendar/Calendar'
import { getDayCodeByDate, getNowDate } from '../data/utils'
import { getDateWithOffsetDays } from '../components/calendar/utils'

const defaultNumWeeks = 4 * 2 // Two months

export default function Home() {
	const nowDate = getNowDate()
	const nowLocalDate = getDayCodeByDate(nowDate)

	const [numWeeks] = createSignal(defaultNumWeeks)

	const fromDate = () => getDateWithOffsetDays(new Date(nowLocalDate), -(numWeeks() * 7))

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
