import { Component } from 'solid-js'

export const DayStatus: Component<{
  checked?: boolean
  tooltip?: string;
	highlightToday?: boolean;
}> = (props) => (

	<div
		class="w-10 h-9 p-1"
		title={props.tooltip || undefined}
	>

		<div
			class="rounded-sm w-full h-full"
			classList={{
				'day-status-today': props.highlightToday,
				'bg-green-300': props.checked,
				'bg-gray-200': !props.checked,
			}}
		/>

	</div>

)
