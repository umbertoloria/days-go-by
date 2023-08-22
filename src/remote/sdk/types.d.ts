// Types
// 2023-08-21T14:36:59Z
// v1.0

export type TCalendar = {
	name: string
	color: string
	datesInfo: TDateInfo[]
}
export type TDateInfo = {
  date: string // Es. "2023-01-01"
	intensity?: number
}
