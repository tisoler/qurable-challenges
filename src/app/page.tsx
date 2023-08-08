'use client'

import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import ExerciseOne from './exercise1'
import ExerciseTwo from './exercise2'
import ExerciseThree from './exercise3'
import ExerciseFour from './exercise4'
import AppContainer from './container'

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
  const router = useRouter()

  const handleGoBack = () => setShowExercise(null)

  if (showExercise) {
    switch (showExercise) {
      case 1:
        return <AppContainer><ExerciseOne onGoBack={handleGoBack} /></AppContainer>
      case 2:
        return <AppContainer><ExerciseTwo onGoBack={handleGoBack} /></AppContainer>
      case 3:
        return <AppContainer><ExerciseThree onGoBack={handleGoBack} /></AppContainer>
      case 4:
        return <AppContainer><ExerciseFour onGoBack={handleGoBack} /></AppContainer>
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
    <AppContainer>
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
      <MenuButton onClick={() => router.push('/exercise5')}>
        Exercise 5
      </MenuButton>
    </AppContainer>
  )
}
