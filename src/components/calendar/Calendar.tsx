import { Component, For } from 'solid-js'
import { Checkbox } from './Checkbox'

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

export const Calendar: Component<{
  progressRows: ProgressRow[];
}> = (props) => (
	<table>
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

