import { Component, For } from 'solid-js';
import { Checkbox } from './Checkbox';

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
];

export type ProgressRow = {
  cells: ProgressCell[]
}
export type ProgressCell = {
  done: boolean
  displayDate: string;
}

export const Calendar: Component<{
  progressRows: ProgressRow[];
}> = ({ progressRows }) => (<>
  <table>
    <tbody>
      <CalendarHead/>
      <For each={progressRows}>
        {(progressRow) => (
          <CalendarRow progressRow={progressRow}/>
        )}
      </For>
    </tbody>
  </table>
</>);

const CalendarHead: Component = () => (<>
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
</>);

const CalendarRow: Component<{
  progressRow: ProgressRow;
}> = ({ progressRow }) => (
  <tr>
    <For each={progressRow.cells}>
      {(cell) => (
        <CalendarCell cell={cell}/>
      )}
    </For>
  </tr>
);

const CalendarCell: Component<{
  cell: ProgressCell;
}> = ({ cell }) => (

  <td style={{
    'margin': '0',
    'padding': '0',
  }}>

    <Checkbox
      checked={cell.done}
      displayDate={cell.displayDate}
    />

  </td>

);

