import { ProgressCell, ProgressRow } from '../components/calendar/Calendar'
import { TDateInfo } from './calendar1'

export function mapDataToProgressRows(datesInfo: TDateInfo[], fromDate: Date, daysToShow: number): ProgressRow[] {
	if (datesInfo.length === 0) {
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
	function addCell(cellToAdd: ProgressCell) {
		const lastRow = rows.at(-1)
		const { cells } = lastRow

		cells.push(cellToAdd)

		if (cells.length === 7) {
			rows.push({
				cells: [],
			})
		}
	}

	const fromDateWeekday = fromDate.getDay() // 0 => sunday
	const fillingCellsCount = (7 + fromDateWeekday - 1) % 7
	let i = 0
	while (i < fillingCellsCount) {
		addCell({
			done: false,
			displayDate: displayDateFromLocalDate(
				getDayCodeByDate(getDateWithOffsetDays(fromDate, -(fillingCellsCount - i))),
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
