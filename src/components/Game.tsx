"use client"

import React, { useState, useEffect, useCallback } from 'react'
import StartMenu from './StartMenu'
import TetrisBoard from './TetrisBoard'
import Scoreboard from './Scoreboard'

type Player = {
  name: string
  highScore: number
}

const Game = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: "Douglas Ek", highScore: 0 },
    { name: "Hannah Ek", highScore: 0 }
  ])
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const loadedPlayers = players.map(player => ({
      ...player,
      highScore: parseInt(localStorage.getItem(`${player.name}_highScore`) || '0')
    }))
    setPlayers(loadedPlayers)
  }, [])

  const startGame = (player: Player) => {
    setCurrentPlayer(player)
    setIsGameStarted(true)
    setScore(0)
  }

  const handleScoreUpdate = useCallback((newScore: number) => {
    setScore(newScore)
  }, [])

  const endGame = useCallback(() => {
    if (currentPlayer && score > currentPlayer.highScore) {
      const updatedPlayers = players.map(p => 
        p.name === currentPlayer.name ? { ...p, highScore: score } : p
      )
      setPlayers(updatedPlayers)
      localStorage.setItem(`${currentPlayer.name}_highScore`, score.toString())
    }
    setIsGameStarted(false)
  }, [currentPlayer, score, players])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isGameStarted ? (
        <StartMenu players={players} onStartGame={startGame} />
      ) : (
        <div className="flex flex-col items-center">
          {currentPlayer && (
            <>
              <Scoreboard score={score} highScore={currentPlayer.highScore} playerName={currentPlayer.name} />
              <TetrisBoard onScoreUpdate={handleScoreUpdate} onGameOver={endGame} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Game