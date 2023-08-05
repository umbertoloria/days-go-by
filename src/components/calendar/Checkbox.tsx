import { Component } from 'solid-js'

export const Checkbox: Component<{
  checked?: boolean
  displayDate?: string;
}> = (props) => (

	<div
		style={{
			width: '40px',
			height: '35px',
			padding: '3px',
		}}
		title={props.displayDate || undefined}
	>

		<div
			classList={{
				'bg-green-300': props.checked,
				'bg-gray-200': !props.checked,
			}}
			style={{
				'border-radius': '1px',
				width: '100%',
				height: '100%',
			}}
		/>

	</div>

)
