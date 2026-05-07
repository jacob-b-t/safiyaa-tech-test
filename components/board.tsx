'use client';

import { useState } from 'react';
import { calculateWinnerDynamic } from '@/lib/tic-tac-toe-engine';
import type { Cell, Player } from '@/models';

interface BoardProps {
  board: Cell[];
  onMove: (index: number) => void;
  disabled: boolean;
  gridSize: number;
}

export default function Board({
  gridSize,
  board,
  disabled,
  onMove,
}: BoardProps) {
  //   const [board, setBoard] = useState<Cell[]>(
  //     Array(gridSize * gridSize).fill(null),
  //   );
  //   const [isXNext, setIsXNext] = useState<boolean>(true);

  //   const [winner, setWinnger] = useState<Player | null>(null);

  //   const handleClick = (index: number) => {
  //     if (winner || board[index]) {
  //       return;
  //     }

  //     const newBoard = [...board];
  //     newBoard[index] = isXNext ? 'X' : 'O';

  //     setBoard(newBoard);
  //     setIsXNext(!isXNext);
  //     setWinnger(calculateWinnerDynamic(newBoard, index, gridSize));
  //   };

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${`${70 / gridSize}vw`})`,
      }}
    >
      {board.map((value, index) => (
        <button
          className={`border border-black rounded-lg text-lg ${value ? (value === 'X' ? 'bg-red-600 text-red-100' : 'bg-blue-600 text-blue-100') : ''}`}
          key={index}
          onClick={() => {
            if (disabled) {
              return;
            }
            onMove(index);
          }}
          style={{ height: `${60 / gridSize}vh` }}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
