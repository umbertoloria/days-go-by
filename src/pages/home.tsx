import { Show, createResource, createSignal, onCleanup } from 'solid-js'
import { Timeline } from '../components/timeline/Timeline'
import { readCalendar } from '../remote/remote'
import { Calendar } from '../components/calendar/Calendar'
import { getDayCodeByDate, getNowDate } from '../lib/utils'
import { getDateWithOffsetDays } from '../components/calendar/utils'

const defaultNumWeeks = 4 * 2 // Two months
const periodRefreshCalendarsInMillis = 10 * 60 * 60 * 1000 // 10 minutes.

export default function Home() {
	const nowDate = getNowDate()
	const nowLocalDate = getDayCodeByDate(nowDate)

	const [numWeeks] = createSignal(defaultNumWeeks)
	const [endDate] = createSignal(new Date(nowLocalDate))
	const [numDaysBefore] = createSignal(14)

	const fromDate = () => getDateWithOffsetDays(new Date(nowLocalDate), -(numWeeks() * 7))

	// Calendars
	const [dataCalendar1, {refetch: refetchCalendar1}] = createResource(1, readCalendar)
	const [dataCalendar2, {refetch: refetchCalendar2}] = createResource(2, readCalendar)
	const [dataCalendar3, {refetch: refetchCalendar3}] = createResource(3, readCalendar)

	const refreshCalendarIntervalTimer = setInterval(() => {
		refetchCalendar1()
		refetchCalendar2()
		refetchCalendar3()
	}, periodRefreshCalendarsInMillis)
	onCleanup(() => clearInterval(refreshCalendarIntervalTimer))

	return (
		<section class=" p-8">

			<div class="flex justify-center gap-10">

				<Show when={!dataCalendar1.loading} fallback={<>Searching...</>}>
					<div>
						<Calendar
							startWeekFromDate={fromDate()}
							numWeeks={numWeeks()}
							calendar={dataCalendar1()}
						/>
					</div>
				</Show>

				<Show when={!dataCalendar2.loading} fallback={<>Searching...</>}>
					<div>
						<Calendar
							startWeekFromDate={fromDate()}
							numWeeks={numWeeks()}
							calendar={dataCalendar2()}
						/>
					</div>
				</Show>

				<Show when={!dataCalendar3.loading} fallback={<>Searching...</>}>
					<div>
						<Calendar
							startWeekFromDate={fromDate()}
							numWeeks={numWeeks()}
							calendar={dataCalendar3()}
						/>
					</div>
				</Show>

			</div>

			<Show when={!dataCalendar1.loading} fallback={<>Searching...</>}>
				<Timeline
					endDate={endDate()}
					numDaysBefore={numDaysBefore()}
					calendar={dataCalendar1()}
				/>
			</Show>

			<Show when={!dataCalendar2.loading} fallback={<>Searching...</>}>
				<Timeline
					endDate={endDate()}
					numDaysBefore={numDaysBefore()}
					calendar={dataCalendar2()}
				/>
			</Show>

			<Show when={!dataCalendar3.loading} fallback={<>Searching...</>}>
				<Timeline
					endDate={endDate()}
					numDaysBefore={numDaysBefore()}
					calendar={dataCalendar3()}
				/>
			</Show>

		</section>
	)
}
