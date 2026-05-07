'use client';

import { useState } from 'react';
import { Field, FieldLabel, FieldGroup } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface GameSettingsFormProps {
  startingSize: number;
  onGridSizeChange: (value: number) => void;
}

export default function GameSettingsForm({
  startingSize,
  onGridSizeChange,
}: GameSettingsFormProps) {
  const [gridSize, setSize] = useState(startingSize);

  return (
    <FieldGroup>
      <Field data-invalid={gridSize < 3 || gridSize > 15}>
        <FieldLabel htmlFor="grid-size">
          {gridSize < 3 || gridSize > 15
            ? 'Please update to a value between 3 and 15'
            : 'Change the board size'}
        </FieldLabel>
        <Input
          id="grid-size"
          placeholder="Change the grid size to anything between 3 and 15 columns"
          min={3}
          max={15}
          value={gridSize}
          type="number"
          aria-invalid={gridSize < 3 || gridSize > 15}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </Field>
      <Button
        disabled={gridSize < 3 || gridSize > 15}
        onClick={() => onGridSizeChange(gridSize)}
      >
        Update grid size
      </Button>
    </FieldGroup>
  );
}
