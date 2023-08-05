import { Component, For } from 'solid-js'
import { Checkbox } from './Checkbox'
import { TDateInfo } from '../../data/calendar1'
import { mapDataToProgressRows } from '../../data/utils'

export const Calendar: Component<{
	startWeekFromDate: Date;
	numWeeks: number;
	datesInfo: TDateInfo[];
}> = (props) => {

	const progressRows = mapDataToProgressRows(props.datesInfo, props.startWeekFromDate, props.numWeeks * 7)

	return (
		<CalendarStateless
			progressRows={progressRows}
		/>
	)
}

// Utils
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
  cells: ProgressCell[]
}
export type ProgressCell = {
  done: boolean
  displayDate: string;
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
				<th style={{
					'margin': '0',
					'padding': '0',
				}}>
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
				<CalendarCell cell={cell}/>
			)}
		</For>
	</tr>
)

const CalendarCell: Component<{
  cell: ProgressCell;
}> = (props) => (

	<td style={{
		'margin': '0',
		'padding': '0',
	}}>

		<Checkbox
			checked={props.cell.done}
			displayDate={props.cell.displayDate}
		/>

	</td>

)

