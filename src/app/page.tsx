'use client'

import { ReactNode, useState } from 'react'
import ExerciseTwo from './exercise2/page'
import ExerciseThree from './exercise3/page'
import ExerciseFour from './exercise4/page'
import ExerciseFive from './exercise5/page'

const buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2'

const MenuButton = ({ onClick, children }: { onClick: () => void, children: ReactNode }) => (
  <button
    className={buttonClass}
    onClick={onClick}
  >
    {children}
  </button>
)

export default function Home() {
  const [showExercise, setShowExercise] = useState<number | null>()

  const handleGoBack = () => setShowExercise(null)

  const getComponent = () => {
    switch (showExercise) {
      case 2:
        return <ExerciseTwo onGoBack={handleGoBack} />
      case 3:
        return <ExerciseThree onGoBack={handleGoBack} />
      case 4:
        return <ExerciseFour onGoBack={handleGoBack} />
      case 5:
        return <ExerciseFive onGoBack={handleGoBack} />
      default:
        return (
          <>
            <span>No exercise selected</span>
            <button className={buttonClass} onClick={handleGoBack}>{'< Back'}</button>
          </>
        )
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-12">
      {
        !showExercise ? (
          <>
            <MenuButton onClick={() => setShowExercise(1)}>
              Exercise 1
            </MenuButton>
            <MenuButton onClick={() => setShowExercise(2)}>
              Exercise 2
            </MenuButton>
            <MenuButton onClick={() => setShowExercise(3)}>
              Exercise 3
            </MenuButton>
            <MenuButton onClick={() => setShowExercise(4)}>
              Exercise 4
            </MenuButton>
            <MenuButton onClick={() => setShowExercise(5)}>
              Exercise 5
            </MenuButton>
          </>
        ) : (
          getComponent()
        )
      }
    </main>
  )
}
