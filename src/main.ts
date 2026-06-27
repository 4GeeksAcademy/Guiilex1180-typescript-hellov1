import "./style.css";

type SeatMatrix = number[][];

const TOTAL_ROWS = 8;
const TOTAL_COLS = 10;

// Inicializa la sala con todos los asientos libres (0).
function createSeatMatrix(rows: number, cols: number): SeatMatrix {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

// Muestra la sala en consola con X (ocupado) y L (libre), incluyendo índices.
function printRoomState(seats: SeatMatrix): void {
  const header = ["   ", ...Array.from({ length: TOTAL_COLS }, (_, c) => String(c + 1).padStart(2, " "))].join(" ");
  console.log(header);
  for (let row = 0; row < seats.length; row += 1) {
    const rowLabel = String(row + 1).padStart(2, " ");
    const state = seats[row].map((seat) => (seat === 1 ? " X" : " L")).join(" ");
    console.log(`${rowLabel} ${state}`);
  }
}

// Reserva un asiento si está disponible y devuelve el mensaje de resultado.
function reserveSeat(seats: SeatMatrix, row: number, col: number): string {
  if (row < 0 || row >= seats.length || col < 0 || col >= seats[0].length) {
    return `Error: la posición (${row + 1}, ${col + 1}) está fuera del rango.`;
  }

  if (seats[row][col] === 1) {
    return `No disponible: el asiento F${row + 1}-C${col + 1} ya está ocupado.`;
  }

  seats[row][col] = 1;
  return `Reserva confirmada: asiento F${row + 1}-C${col + 1}.`;
}

// Cuenta cuántos asientos están ocupados y cuántos libres.
function countSeats(seats: SeatMatrix): [number, number] {
  let occupied = 0;

  for (const row of seats) {
    for (const seat of row) {
      if (seat === 1) {
        occupied += 1;
      }
    }
  }

  const available = seats.length * seats[0].length - occupied;
  return [occupied, available];
}

// Busca el primer par de asientos libres contiguos en una misma fila.
function findFirstContiguousPair(seats: SeatMatrix): [number, number, number] | null {
  for (let row = 0; row < seats.length; row += 1) {
    for (let col = 0; col < seats[row].length - 1; col += 1) {
      if (seats[row][col] === 0 && seats[row][col + 1] === 0) {
        return [row, col, col + 1];
      }
    }
  }
  return null;
}

function createPartiallyOccupiedRoom(): SeatMatrix {
  const seats = createSeatMatrix(TOTAL_ROWS, TOTAL_COLS);
  const taken: Array<[number, number]> = [
    [0, 0],
    [0, 1],
    [1, 4],
    [2, 2],
    [2, 3],
    [4, 7],
    [6, 0],
    [7, 9],
  ];

  for (const [row, col] of taken) {
    seats[row][col] = 1;
  }

  return seats;
}

function createAlmostFullWithSinglesRoom(): SeatMatrix {
  const seats = createSeatMatrix(TOTAL_ROWS, TOTAL_COLS);

  for (let row = 0; row < TOTAL_ROWS; row += 1) {
    for (let col = 0; col < TOTAL_COLS; col += 1) {
      seats[row][col] = 1;
    }
  }

  const freeSingles: Array<[number, number]> = [
    [0, 0],
    [1, 2],
    [2, 4],
    [3, 6],
    [4, 8],
    [5, 1],
    [6, 3],
    [7, 5],
  ];

  for (const [row, col] of freeSingles) {
    seats[row][col] = 0;
  }

  return seats;
}

function createFullRoom(): SeatMatrix {
  const seats = createSeatMatrix(TOTAL_ROWS, TOTAL_COLS);
  for (let row = 0; row < TOTAL_ROWS; row += 1) {
    for (let col = 0; col < TOTAL_COLS; col += 1) {
      seats[row][col] = 1;
    }
  }
  return seats;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el contenedor principal #app.");
}

const appRoot = app;

let seats = createSeatMatrix(TOTAL_ROWS, TOTAL_COLS);
let lastMessage = "Haz clic en un asiento libre para reservarlo.";

function render(): void {
  const [occupied, available] = countSeats(seats);
  const contiguousPair = findFirstContiguousPair(seats);
  const contiguousMessage = contiguousPair
    ? `Par contiguo disponible en F${contiguousPair[0] + 1}: C${contiguousPair[1] + 1} y C${contiguousPair[2] + 1}.`
    : "No hay pares contiguos disponibles.";

  let seatRows = "";
  for (let row = 0; row < TOTAL_ROWS; row += 1) {
    seatRows += `<div class="contents">`;
    seatRows += `<div class="flex items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">F${row + 1}</div>`;
    for (let col = 0; col < TOTAL_COLS; col += 1) {
      const isTaken = seats[row][col] === 1;
      const isContiguousSuggested =
        !!contiguousPair &&
        contiguousPair[0] === row &&
        (contiguousPair[1] === col || contiguousPair[2] === col);
      const seatClass = isTaken
        ? "bg-rose-500 text-white hover:bg-rose-500 cursor-not-allowed"
        : isContiguousSuggested
          ? "bg-amber-400 text-slate-900 ring-2 ring-amber-600 ring-offset-1 hover:bg-amber-500"
          : "bg-emerald-500 text-white hover:bg-emerald-600";
      seatRows += `<button
        type="button"
        class="h-9 rounded-md text-xs font-semibold transition ${seatClass}"
        data-row="${row}"
        data-col="${col}"
      >${col + 1}</button>`;
    }
    seatRows += `</div>`;
  }

  appRoot.innerHTML = `
    <section class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <header class="mb-5 space-y-3">
        <h1 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Cinema Seat Manager</h1>
        <p class="text-sm text-slate-600">Mapa visual de 8 filas x 10 columnas. <span class="font-semibold text-emerald-700">Verde</span>: libre, <span class="font-semibold text-rose-700">rojo</span>: ocupado, <span class="font-semibold text-amber-700">ámbar</span>: par contiguo sugerido.</p>
      </header>

      <div class="mb-4 grid gap-2 text-sm sm:grid-cols-3">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">Ocupados: <span class="font-bold">${occupied}</span></div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">Disponibles: <span class="font-bold">${available}</span></div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">Total: <span class="font-bold">${TOTAL_ROWS * TOTAL_COLS}</span></div>
      </div>

      <div class="mb-4 flex flex-wrap gap-2">
        <button type="button" data-action="empty" class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Sala vacía</button>
        <button type="button" data-action="partial" class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Sala parcial</button>
        <button type="button" data-action="almost-full" class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Casi llena</button>
        <button type="button" data-action="full" class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">Sala llena</button>
      </div>

      <div class="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">${contiguousMessage}</div>
      <div class="mb-4 rounded-xl border border-slate-200 bg-indigo-50 p-3 text-sm text-indigo-900">${lastMessage}</div>

      <div class="mb-3 rounded-md bg-slate-900/90 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white">Pantalla</div>

      <div class="grid gap-2" style="grid-template-columns: 42px repeat(${TOTAL_COLS}, minmax(0, 1fr));">
        <div></div>
        ${Array.from({ length: TOTAL_COLS }, (_, col) => `<div class="text-center text-xs font-semibold text-slate-500">C${col + 1}</div>`).join("")}
        ${seatRows}
      </div>
    </section>
  `;

  const seatButtons = appRoot.querySelectorAll<HTMLButtonElement>("button[data-row][data-col]");
  for (const button of seatButtons) {
    button.addEventListener("click", () => {
      const row = Number(button.dataset.row);
      const col = Number(button.dataset.col);
      lastMessage = reserveSeat(seats, row, col);
      render();
    });
  }

  const scenarioButtons = appRoot.querySelectorAll<HTMLButtonElement>("button[data-action]");
  for (const button of scenarioButtons) {
    button.addEventListener("click", () => {
      const action = button.dataset.action;

      if (action === "empty") {
        seats = createSeatMatrix(TOTAL_ROWS, TOTAL_COLS);
        lastMessage = "Escenario cargado: sala vacía.";
      } else if (action === "partial") {
        seats = createPartiallyOccupiedRoom();
        lastMessage = "Escenario cargado: sala parcialmente ocupada.";
      } else if (action === "almost-full") {
        seats = createAlmostFullWithSinglesRoom();
        lastMessage = "Escenario cargado: sala casi llena con asientos sueltos.";
      } else if (action === "full") {
        seats = createFullRoom();
        lastMessage = "Escenario cargado: sala completamente llena.";
      }

      printRoomState(seats);
      render();
    });
  }
}

printRoomState(seats);
render();

export {};
