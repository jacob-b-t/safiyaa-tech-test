import type { Player, Cell } from '@/models';

export const calculateWinnerDefault = (board: Cell[]): Player | null => {
  const winConditions: number[][] = [
    // Row win conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Column win conditions
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagnoal win conditions
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winConditions) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export const calculateWinnerDynamic = (
  board: Cell[],
  lastIndex: number,
  size: number,
): Player | null => {
  const player = board[lastIndex];

  if (!player) {
    return null;
  }

  const row = Math.floor(lastIndex / size);
  const col = lastIndex % size;

  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  const countInDirection = (
    directionRow: number,
    directionColumn: number,
  ): number => {
    let count = 0;

    let r = row + directionRow;
    let c = col + directionColumn;

    while (
      r >= 0 &&
      r < size &&
      c >= 0 &&
      c < size &&
      board[r * size + c] === player
    ) {
      count++;
      r += directionRow;
      c += directionColumn;
    }

    return count;
  };

  for (const [directionRow, directionColumn] of directions) {
    const total =
      1 +
      countInDirection(directionRow, directionColumn) +
      countInDirection(-directionRow, -directionColumn);

    if (total >= size) {
      return player;
    }
  }

  return null;
};
