import { Component, For } from 'solid-js'
import { DayStatus } from './DayStatus'
import { TDateInfo } from '../../data/calendar1'
import { datesInTheSameDay } from '../../data/utils'
import { mapDataToWeeks, moveDateToWeekStart } from './utils'

export const Calendar: Component<{
	startWeekFromDate: Date;
	numWeeks: number;
	datesInfo: TDateInfo[];
}> = (props) => {

	const fromDateInitial = new Date(props.startWeekFromDate)
	const fromDateFloor = moveDateToWeekStart(fromDateInitial)

	const numDays =  !datesInTheSameDay(fromDateInitial, fromDateFloor) 
		? (props.numWeeks + 1) * 7
		: props.numWeeks * 7
	
	const weeks = mapDataToWeeks(props.datesInfo, fromDateFloor, numDays)

	return (
		<CalendarStateless
			weeks={weeks}
		/>
	)
}

const CalendarStateless: Component<{
  weeks: CalendarWeekProps[];
}> = (props) => (
	<table class='m-auto text-gray-700'>
		<tbody>
			<CalendarHead/>
			<For each={props.weeks}>
				{(week) => (
					<CalendarWeek {...week}/>
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

export type CalendarWeekProps = {
  cells: CalendarCellProps[]
}
const CalendarWeek: Component<CalendarWeekProps> = (props) => (
	<tr>
		<For each={props.cells}>
			{(cell) => (
				<CalendarCell {...cell}/>
			)}
		</For>
	</tr>
)

export type CalendarCellProps = {
  done: boolean
  displayDate: string;
	isToday: boolean;
}
const CalendarCell: Component<CalendarCellProps> = (props) => (
	<td class="m-0 p-0">
		<DayStatus
			checked={props.done}
			tooltip={props.displayDate}
			highlightToday={props.isToday}
		/>
	</td>
)
