import { CalendarCellProps, ProgressRow } from '../components/calendar/Calendar'
import { TDateInfo } from './calendar1'


const fillingCellsCount = 7
export function mapDataToProgressRows(datesInfo: TDateInfo[], fromDate: Date, daysToShow: number): ProgressRow[] {
	if (datesInfo.length === 0) {
		// Given no dates.
		return [
			{
				cells: [],
			},
		]
	}

	const rows: ProgressRow[] = [
		{
			cells: [],
		},
	]
	function addCell(cellToAdd: CalendarCellProps) {
		const lastRow = rows.at(-1)
		const { cells } = lastRow
		cells.push(cellToAdd)
		if (cells.length === fillingCellsCount) {
			rows.push({
				cells: [],
			})
		}
	}

	const fromDateWeekday = fromDate.getDay() // 0 => sunday
	const startFillCellsCount = (fillingCellsCount + fromDateWeekday - 1) % fillingCellsCount
	let i = 0
	while (i < startFillCellsCount) {
		addCell({
			done: false,
			displayDate: displayDateFromLocalDate(
				getDayCodeByDate(getDateWithOffsetDays(fromDate, -(startFillCellsCount - i))),
			),
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

		const strDate = getDayCodeByDate(getDateWithOffsetDays(fromDate, daysShown))

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
		})

		++daysShown
	}

	if (startFillCellsCount > 0) {
		const endFillCellsCount = fillingCellsCount - startFillCellsCount
		i = 0
		while (i < endFillCellsCount) {
			addCell({
				done: false,
				displayDate: displayDateFromLocalDate(
					getDayCodeByDate(getDateWithOffsetDays(fromDate, daysToShow + i)),
				),
			})
			++i
		}
	}

	return rows
}

function getDayCodeByDate(date: Date) {
	return getDayCode(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

function getDayCode(year: number, month: number, day: number) {
	return `${year}`
    + `-${month.toString().padStart(2, '0')}`
    + `-${day.toString().padStart(2, '0')}`
}

function getDateWithOffsetDays(fromDate: Date, offset: number) {
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

function localDatesLTE(aLocalDate: string, bLocalDate: string) {
	return datesLTE(new Date(aLocalDate), new Date(bLocalDate))
}

function datesLTE(aDate: Date, bDate: Date) {
	return aDate.getTime() <= bDate.getTime()
}

export function moveDateToWeekStart(date: Date) {
	const weekday = date.getDay() // 0 => sunday
	const numDaysFromMonday = (7 + weekday - 1) % 7

	const clone = new Date(date)
	clone.setDate(clone.getDate() - numDaysFromMonday)
	return clone
}

export function datesInTheSameDay(aDate: Date, bDate: Date) {
	return getDayCodeByDate(aDate) === getDayCodeByDate(bDate)
}
