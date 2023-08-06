import { Component } from 'solid-js'
import { TDateInfo } from '../../data/calendar1'
import { CalendarCellProps, CalendarStateless } from '../calendar/Calendar'
import { displayDateFromLocalDate, getDateWithOffsetDays } from '../calendar/utils'
import { getDayCodeByDate, getNowDate, localDatesLT } from '../../data/utils'

export const Timeline: Component<{
	endDate: Date;
	numDaysBefore: number;
	datesInfo: TDateInfo[];
}> = (props) => {
	let iDatesInfo = 0

	const nowDate = getNowDate()
	const nowLocalDate = getDayCodeByDate(nowDate)

	const cells: CalendarCellProps[] = []
	let iCell = props.numDaysBefore
	while (iCell >= 0) {
		const curDate = getDateWithOffsetDays(props.endDate, -iCell)
		const localDate = getDayCodeByDate(curDate)

		while (iDatesInfo < props.datesInfo.length && localDatesLT(props.datesInfo[iDatesInfo].date, localDate)) {
			++iDatesInfo
		}

		if (iDatesInfo < props.datesInfo.length) {
			
			const dateInfo = props.datesInfo[iDatesInfo]

			if (dateInfo.date === localDate) {
				cells.push({
					displayDate: displayDateFromLocalDate(localDate),
					done: true,
					isToday: dateInfo.date === nowLocalDate,
				})
			} else {
	
				cells.push({
					displayDate: displayDateFromLocalDate(localDate),
					done: false,
					isToday: false,
				})

			}

		} else {

			cells.push({
				displayDate: displayDateFromLocalDate(localDate),
				done: false,
				isToday: false,
			})
		}
		
		--iCell
	}
	return (
		<CalendarStateless
			weeks={[
				{
					cells,
				},
			]}
		/>
	)
}