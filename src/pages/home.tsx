import { createSignal } from 'solid-js'
import { calendar1, calendar2, calendar3 } from '../data/example-calendars'
import { Calendar } from '../components/calendar/Calendar'
import { Timeline } from '../components/timeline/Timeline'
import { getDayCodeByDate, getNowDate } from '../lib/utils'
import { getDateWithOffsetDays } from '../components/calendar/utils'

const defaultNumWeeks = 4 * 2 // Two months

export default function Home() {
	const nowDate = getNowDate()
	const nowLocalDate = getDayCodeByDate(nowDate)

	const [numWeeks] = createSignal(defaultNumWeeks)
	const [endDate] = createSignal(new Date(nowLocalDate))
	const [numDaysBefore] = createSignal(14)

	const fromDate = () => getDateWithOffsetDays(new Date(nowLocalDate), -(numWeeks() * 7))

	return (
		<section class=" p-8">

			<div class="flex justify-center gap-10">
				<div>
					<Calendar
						startWeekFromDate={fromDate()}
						numWeeks={numWeeks()}
						datesInfo={calendar1}
					/>
				</div>
				<div>
					<Calendar
						startWeekFromDate={fromDate()}
						numWeeks={numWeeks()}
						datesInfo={calendar2}
					/>
				</div>
				<div>
					<Calendar
						startWeekFromDate={fromDate()}
						numWeeks={numWeeks()}
						datesInfo={calendar3}
					/>
				</div>
			</div>
			
			<Timeline
				endDate={endDate()}
				numDaysBefore={numDaysBefore()}
				datesInfo={calendar1}
			/>
			<Timeline
				endDate={endDate()}
				numDaysBefore={numDaysBefore()}
				datesInfo={calendar2}
			/>
			<Timeline
				endDate={endDate()}
				numDaysBefore={numDaysBefore()}
				datesInfo={calendar3}
			/>

		</section>
	)
}
