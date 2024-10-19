import React from 'react'

type Player = {
  name: string
  highScore: number
}

type StartMenuProps = {
  players: Player[]
  onStartGame: (player: Player) => void
}

const StartMenu = ({ players, onStartGame }: StartMenuProps) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Tetris</h1>
      <div className="space-y-4">
        {players.map((player) => (
          <button
            key={player.name}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => onStartGame(player)}
          >
            Play as {player.name}
            <span className="block text-sm">High Score: {player.highScore}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StartMenu