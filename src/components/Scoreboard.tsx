import React from 'react'

type ScoreboardProps = {
  score: number
  highScore: number
  playerName: string
}

const Scoreboard = ({ score, highScore, playerName }: ScoreboardProps) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl font-bold">{playerName}'s Game</h2>
      <p className="text-xl">Score: {score}</p>
      <p className="text-lg">High Score: {highScore}</p>
    </div>
  )
}

export default Scoreboard