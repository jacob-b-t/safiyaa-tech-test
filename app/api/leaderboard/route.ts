import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { getDb } from '@/lib/database';

const leaderboardData = [
  { id: 1, name: 'Alice', score: 1500 },
  { id: 2, name: 'Bob', score: 1200 },
  { id: 3, name: 'Charlie', score: 1000 },
];

// GET /api/leaderboard
export async function GET() {
  return NextResponse.json({
    success: true,
    data: leaderboardData,
  });
}

// POST /api/leaderboard

export async function POST() {
  const db = await getDb();
  try {
    const insertCommand = `
      INSERT OR REPLACE INTO ${config.tableName} (id, name, score) VALUES (?, ?, ?)
      `;
    for (const person of leaderboardData) {
      await db.run(insertCommand, [person.id, person.name, person.score]);
    }
    return NextResponse.json({
      success: true,
      data: 'items added to db successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
