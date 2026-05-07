import Game from '@/components/game';

export default function Page() {
  return (
    <div className="flex my-10">
      <div className="flex flex-col items-center gap-10 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Tic Tac Toe
        </h1>
        <Game />
      </div>
    </div>
  );
}
