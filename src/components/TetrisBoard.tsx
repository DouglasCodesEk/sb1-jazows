import React, { useState, useEffect, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../utils/tetrominos'
import { STAGE_WIDTH, STAGE_HEIGHT, createStage } from '../utils/gameHelpers'

type TetrisBoardProps = {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
}

const TetrisBoard = ({ onScoreUpdate, onGameOver }: TetrisBoardProps) => {
  const [dropTime, setDropTime] = useState<null | number>(null)
  const [gameOver, setGameOver] = useState(false)
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  })
  const [stage, setStage] = useState(createStage())

  const movePlayer = useCallback((dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      setPlayer(prev => ({
        ...prev,
        pos: { x: prev.pos.x + dir, y: prev.pos.y }
      }))
    }
  }, [player, stage])

  const drop = useCallback(() => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      setPlayer(prev => ({
        ...prev,
        pos: { x: prev.pos.x, y: prev.pos.y + 1 }
      }))
    } else {
      if (player.pos.y < 1) {
        setGameOver(true)
        setDropTime(null)
      }
      setPlayer(prev => ({
        ...prev,
        collided: true,
      }))
    }
  }, [player, stage])

  const keyUp = useCallback(({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000)
      }
    }
  }, [gameOver])

  const dropPlayer = useCallback(() => {
    setDropTime(null)
    drop()
  }, [drop])

  const move = useCallback(({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1)
      } else if (keyCode === 39) {
        movePlayer(1)
      } else if (keyCode === 40) {
        dropPlayer()
      } else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  }, [gameOver, movePlayer, dropPlayer, stage])

  const playerRotate = (stage: any, dir: number) => {
    // Rotation logic here
  }

  const checkCollision = (player: any, stage: any, { x: moveX, y: moveY }: { x: number, y: number }) => {
    // Collision detection logic here
    return false
  }

  useEffect(() => {
    // Set up game loop
  }, [])

  return (
    <div 
      tabIndex={0} 
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
      className="border-2 border-gray-800 p-4 focus:outline-none"
    >
      <div className="grid grid-cols-10 gap-1">
        {stage.map((row: any, y: number) =>
          row.map((cell: any, x: number) => (
            <div
              key={`${y}-${x}`}
              className={`w-6 h-6 ${
                cell[0] === 0
                  ? 'bg-gray-200'
                  : `bg-${TETROMINOS[cell[0] as keyof typeof TETROMINOS]?.color || 'gray-200'}`
              }`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TetrisBoard