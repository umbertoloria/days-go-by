import { Component, For } from 'solid-js'
import { DayStatus } from './DayStatus'
import { TDateInfo } from '../../data/calendar1'
import { datesInTheSameDay, mapDataToProgressRows, moveDateToWeekStart } from '../../data/utils'

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
	
	const progressRows = mapDataToProgressRows(props.datesInfo, fromDateFloor, numDays)

	return (
		<CalendarStateless
			progressRows={progressRows}
		/>
	)
}

const days = [
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

export type ProgressRow = {
  cells: CalendarCellProps[]
}

const CalendarStateless: Component<{
  progressRows: ProgressRow[];
}> = (props) => (
	<table class='m-auto text-gray-700'>
		<tbody>
			<CalendarHead/>
			<For each={props.progressRows}>
				{(progressRow) => (
					<CalendarRow progressRow={progressRow}/>
				)}
			</For>
		</tbody>
	</table>
)

const CalendarHead: Component = () => (
	<tr>
		<For each={days}>
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

const CalendarRow: Component<{
  progressRow: ProgressRow;
}> = (props) => (
	<tr>
		<For each={props.progressRow.cells}>
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
