'use client';

import { useState } from 'react';
import Board from './board';
import GameSettingsForm from './gameSettingsForm';
import { calculateWinnerDynamic } from '@/lib/tic-tac-toe-engine';
import type { Cell, Player } from '@/models';
import { Button } from './ui/button';

const fillBlankArray = (size: number): Cell[] => {
  return Array(size * size).fill(null);
};

export default function Game() {
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<Cell[]>(fillBlankArray(gridSize));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinnger] = useState<Player | null>(null);

  const handleClick = (index: number) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinnger(calculateWinnerDynamic(newBoard, index, gridSize));
  };

  const resetBoard = (size: number) => {
    setGridSize(size);
    setBoard(fillBlankArray(size));
    setIsXNext(true);
    setWinnger(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg text-center">{`${winner ? `Winner: ${winner}` : `Current Player: ${isXNext ? 'You' : 'Opponent'}`}`}</h2>
        {!!winner && (
          <Button onClick={() => resetBoard(gridSize)}>Start again</Button>
        )}
      </div>
      <GameSettingsForm startingSize={gridSize} onGridSizeChange={resetBoard} />
      <div className="my-10">
        <Board
          gridSize={gridSize}
          board={board}
          disabled={!!winner}
          onMove={handleClick}
        />
      </div>
    </div>
  );
}
