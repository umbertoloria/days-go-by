import { TDateInfo } from '../../data/calendar1'
import { datesInTheSameDay, getDayCodeByDate, getNowDate, localDatesLTE } from '../../data/utils'
import { CalendarCellProps, CalendarWeekProps } from './Calendar'

export function mapDataToWeeks(datesInfo: TDateInfo[], fromDate: Date, daysToShow: number): CalendarWeekProps[] {
	if (datesInfo.length === 0) {
		// Given no dates.
		return [
			{
				cells: [],
			},
		]
	}

	const fillingCellsCount =  7 as const

	const weeks: CalendarWeekProps[] = [
		{
			cells: [],
		},
	]
	function addCell(cellToAdd: CalendarCellProps) {
		const lastRow = weeks.at(-1)
		const { cells } = lastRow
		cells.push(cellToAdd)
		if (cells.length === fillingCellsCount) {
			weeks.push({
				cells: [],
			})
		}
	}

	const nowDate = getNowDate()

	const fromDateWeekday = fromDate.getDay() // 0 => sunday
	const startFillCellsCount = (fillingCellsCount + fromDateWeekday - 1) % fillingCellsCount
	let i = 0
	while (i < startFillCellsCount) {
		const curDate = getDateWithOffsetDays(fromDate, -(startFillCellsCount - i))
		addCell({
			done: false,
			displayDate: displayDateFromLocalDate(getDayCodeByDate(curDate)),
			isToday: datesInTheSameDay(curDate, nowDate),
		})
		++i
	}

	let daysShown = 0
	const strDate = getDayCodeByDate(getDateWithOffsetDays(fromDate, daysShown))

	let iData = 0
	let lastDateInfo = datesInfo[iData++]
	while (!!lastDateInfo && !localDatesLTE(strDate, lastDateInfo.date)) {
		lastDateInfo = datesInfo[iData++]
	}

	while (daysShown < daysToShow) {

		const curDate = getDateWithOffsetDays(fromDate, daysShown)
		const strDate = getDayCodeByDate(curDate)

		let done = false
		if (lastDateInfo) {
			if (strDate === lastDateInfo.date) {
				done = true
				lastDateInfo = datesInfo[iData++]
			}
		}

		addCell({
			done,
			displayDate: displayDateFromLocalDate(strDate),
			isToday: datesInTheSameDay(curDate, nowDate),
		})

		++daysShown
	}

	if (startFillCellsCount > 0) {
		const endFillCellsCount = fillingCellsCount - startFillCellsCount
		i = 0
		while (i < endFillCellsCount) {
			const curDate = getDateWithOffsetDays(fromDate, daysToShow + i)
			addCell({
				done: false,
				displayDate: displayDateFromLocalDate(getDayCodeByDate(curDate)),
				isToday: datesInTheSameDay(curDate, nowDate),
			})
			++i
		}
	}

	return weeks
}

export function getDateWithOffsetDays(fromDate: Date, offset: number) {
	const result = new Date(fromDate)
	result.setDate(result.getDate() + offset)
	return result
}

function displayDateFromLocalDate(localDate: string) {
	const formatter = new Intl.DateTimeFormat('it', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
	return formatter.format(new Date(localDate))
}

export function moveDateToWeekStart(date: Date) {
	const weekday = date.getDay() // 0 => sunday
	const numDaysFromMonday = (7 + weekday - 1) % 7

	const clone = new Date(date)
	clone.setDate(clone.getDate() - numDaysFromMonday)
	return clone
}
