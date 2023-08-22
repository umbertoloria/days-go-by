import { Component, For, Show } from 'solid-js'
import { DayStatus } from './DayStatus'
import { TCalendar } from '../../remote/sdk/types'
import { datesInTheSameDay } from '../../lib/utils'
import { mapDataToCalendarLines, moveDateToWeekStart } from './utils'

export const Calendar: Component<{
	startWeekFromDate: Date
	numWeeks: number
	calendar: TCalendar
}> = (props) => {

	const fromDateInitial = new Date(props.startWeekFromDate)
	const fromDateFloor = moveDateToWeekStart(fromDateInitial)

	const numDays =  !datesInTheSameDay(fromDateInitial, fromDateFloor) 
		? (props.numWeeks + 1) * 7
		: props.numWeeks * 7
	
	const calendarLines = mapDataToCalendarLines(props.calendar, fromDateFloor, numDays)

	return (
		<CalendarStateless
			calendarLines={calendarLines}
			placeTableHeadWithWeekDays
		/>
	)
}

export const CalendarStateless: Component<{
  calendarLines: CalendarLineProps[]
	placeTableHeadWithWeekDays?: boolean
}> = (props) => (
	<table class='m-auto text-gray-700'>
		<tbody>
			<Show when={props.placeTableHeadWithWeekDays}>
				<CalendarHead/>
			</Show>
			<For each={props.calendarLines}>
				{(calendarLine) => (
					<CalendarLine {...calendarLine}/>
				)}
			</For>
		</tbody>
	</table>
)

const weekDays = [
	{
		name: 'monday',
		display: 'Lun',
	},
	{
		name: 'tuesday',
		display: 'Mar',
	},
	{
		name: 'wednesday',
		display: 'Mer',
	},
	{
		name: 'thursday',
		display: 'Gio',
	},
	{
		name: 'friday',
		display: 'Ven',
	},
	{
		name: 'saturday',
		display: 'Sab',
	},
	{
		name: 'sunday',
		display: 'Dom',
	},
]
const CalendarHead: Component = () => (
	<tr>
		<For each={weekDays}>
			{(day) => (
				<th class="m-0 p-0">
					<span>
						{day.display}
					</span>
				</th>
			)}
		</For>
	</tr>
)

export type CalendarLineProps = {
  cells: CalendarCellProps[]
}
const CalendarLine: Component<CalendarLineProps> = (props) => (
	<tr>
		<For each={props.cells}>
			{(cell) => (
				<CalendarCell {...cell}/>
			)}
		</For>
	</tr>
)

export type CalendarCellProps = {
  displayDate: string
	color: string
  done: boolean
	isToday: boolean
}
const CalendarCell: Component<CalendarCellProps> = (props) => (
	<td class="m-0 p-0">
		<DayStatus
			checked={props.done}
			color={props.color}
			tooltip={props.displayDate}
			highlightToday={props.isToday}
		/>
	</td>
)
