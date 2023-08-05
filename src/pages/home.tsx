import { createSignal } from 'solid-js';
import { Calendar } from '../components/calendar/Calendar';
import { mapDataToProgressRows } from '../data/utils';
import { calendar1 } from '../data/calendar1';

export default function Home() {
  const [count, setCount] = createSignal(0);

  const progressRows = mapDataToProgressRows(calendar1, new Date(2023, 3, 26), 120);

  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Home</h1>
      <p class="mt-4">This is the home page.</p>

      <Calendar progressRows={progressRows}/>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() - 1)}
        >
          -
        </button>

        <output class="p-10px">Count: {count()}</output>

        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>
      </div>
    </section>
  );
}
