'use client'

import { useState } from 'react'
import ExerciseTwo from './exercise2/page'
import ExerciseFour from './exercise4/page'

export default function Home() {
  const [showExercise, setShowExercise] = useState<number | null>()

  const getComponent = () => {
    switch (showExercise) {
      case 2:
        return <ExerciseTwo onGoBack={() => setShowExercise(null)} />
      case 4:
        return <ExerciseFour onGoBack={() => setShowExercise(null)} />
      default:
        return (
          <>
            <span>No exercise selected</span>
            <button className={buttonClass} onClick={() => setShowExercise(null)}>{'< Back'}</button>
          </>
        )
    }
  }

  const buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/12 h-20 m-2'

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {
        !showExercise ? (
          <>
            <button
              className={buttonClass}
              onClick={() => setShowExercise(1)}
            >
              Exercise 1
            </button>
            <button
              className={buttonClass}
              onClick={() => setShowExercise(2)}
            >
              Exercise 2
            </button>
            <button
              className={buttonClass}
              onClick={() => setShowExercise(3)}
            >
              Exercise 3
            </button>
            <button
              className={buttonClass}
              onClick={() => setShowExercise(4)}
            >
              Exercise 4
            </button>
            <button
              className={buttonClass}
              onClick={() => setShowExercise(5)}
            >
              Exercise 5
            </button>
          </>
        ) : (
          getComponent()
        )
      }
    </main>
  )
}
