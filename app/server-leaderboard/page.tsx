import { getDb } from '@/lib/database';
import { config } from '@/lib/config';

export default async function Page() {
  const db = await getDb();
  const allResults = await db.all(
    `SELECT name, score FROM ${config.tableName} ORDER BY score DESC`,
  );

  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col items-center flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Leaderboard
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4 flex-1 mt-10">
        {allResults.map((r, index) => (
          <div
            key={index}
            className="font-bold text-l"
          >{`${index + 1} ${r.name}`}</div>
        ))}
      </div>
    </div>
  );
}
