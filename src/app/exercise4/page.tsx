'use client'

import { ChangeEvent, useState } from "react"
import { Animal, Elephant, Lion, Monkey, Zoo } from "./animals"

interface ExerciseTwoProps {
  onGoBack: () => void
}

const lion = new Lion()
const elephant = new Elephant()
const monkey = new Monkey()
const zoo = new Zoo()

const ExerciseFour = ({ onGoBack }: ExerciseTwoProps) => {
  const [firstAnimal, setFirstAnimal] = useState<Animal>()
  const [secondAnimal, setSecondAnimal] = useState<Animal>()
  const [meet, setMeet] = useState<string>()
  const [fillFirstAnimal, setFillFirstAnimal] = useState<boolean>(true)

  const handleSetAnimal = (animal: Animal) => {
    if (fillFirstAnimal) {
      setFirstAnimal(animal)
    } else {
      setSecondAnimal(animal)
    }
    setFillFirstAnimal(!fillFirstAnimal)
  }

  const handleMeet = () => {
    if (!firstAnimal || !secondAnimal) return
    setMeet(zoo.meet(firstAnimal, secondAnimal))
  }

  return (
    <>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-3/12 lg:w-2/12 h-20 m-2 text-5xl"
          onClick={() => handleSetAnimal(lion)}
        >
            {lion.getIcon()}
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-3/12 lg:w-2/12 h-20 m-2 text-5xl"
          onClick={() => handleSetAnimal(elephant)}
        >
            {elephant.getIcon()}
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-3/12 lg:w-2/12 h-20 m-2 text-5xl"
          onClick={() => handleSetAnimal(monkey)}
        >
          {monkey.getIcon()}
        </button>
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        <div className="text-5xl border-solid border-gray-500 border-2 m-2 p-6">
          {firstAnimal?.getIcon()}
        </div>
        <div className="text-5xl border-solid border-gray-500 border-2 m-2 p-6">
          {secondAnimal?.getIcon()}
        </div>
      </div>
      <button
        className={`bg-${!firstAnimal || !secondAnimal ? 'gray' : 'green'}-500 ${firstAnimal && secondAnimal && 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2`}
        disabled={!firstAnimal || !secondAnimal}
        onClick={handleMeet}
      >
        Meet!
      </button>
      <input
        value={meet || ''}
        disabled
        className="shadow appearance-none border rounded w-full sm:w-11/12 md:w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
        onClick={onGoBack}
      >
        {'< Back'}
      </button>
    </>
  )
}

export default ExerciseFour
